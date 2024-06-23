import config from "./config.js";
import passport from 'passport';
import local from 'passport-local';
import passjwt  from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { usersService } from "../applicationserver/services/users.service.js";
import { cookieExtractor,createHash,checkValidPassword } from "../utils/utils.js";
const LocalStrategy = local.Strategy;
const JWTStrategy =  passjwt.Strategy;
const ExtractJwt = passjwt.ExtractJwt;

// console.log("config.jwt.secret " + config.jwt.cookie_name)
// console.log("port " + config.port)
// console.log("config.session.SUPERADMIN_PASSWORD " + config.session.SUPERADMIN_PASSWORD)

export const generateEmailToken = (email) => {
    const payload = {
      email,
      timestamp: Date.now(), // Marca de tiempo en milisegundos
    };
    return jwt.sign(payload, config.privateKey, { expiresIn: "1h" }); // Expira en 10 segundos
  };
  

export const verifyEmailToken = (token) => {
    try {
      const decoded = passjwt.verify(token, config.privateKey);
      const { timestamp } = decoded;
      const currentTime = Date.now();
      return currentTime - timestamp < 60 * 60 * 1000; // Verificar si han pasado menos de una hora
    } catch (error) {
      return false; // Token inválido
    }
  };
  

const initializePassport = () =>{
    passport.use('register' ,new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false}
                            ,async(req,username,password,done)=>{
        let {first_name,last_name,email,phone} = req.body;
        try{
            if(!req.file) return done(null,false,{messages:"Couldn't get picture for user"})
            let user  = await UserServices.getBy({email:email})
            if(user) return done(null,false,{messages:"User Already exists"});
            //let cart = await cartService.save({products:[]})
            const newUser ={
                first_name,
                last_name,
                email,
                phone,
                password:createHash(password),
                role:"user",
                //cart: cart._id,
                profile_picture:req.file.location
            }
            let result = await UserServices.save(newUser);
            return done(null,result);
        }catch(err){
            console.log(err);
            return done(err);
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'}
                        ,async(username,password,done)=>{
        try{
            if(username===config.session.SUPERADMIN&&password===config.session.SUPERADMIN_PASSWORD)
            return done(null,{id:0,role:"superadmin"})
            const user = await usersService.getBy({email:username})
            if(!user) return done(null,false,{messages:"No user found"});
            if(!checkValidPassword(user,password)) return done(null,false,{messages:"Incorrect password"});
            return done(null,user);
        }catch(err){
            return done(err);
        }
    }))

    passport.use('jwt'  ,new JWTStrategy({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:config.jwt.secret}
    //passport.use('jwt'  ,new JWTStrategy({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:'secret_cookie'}
                        ,async(jwt_payload,done)=>{
        try{
            if(jwt_payload.role==="superadmin") return done(null,jwt_payload)
            let user = await usersService.getBy({_id:jwt_payload.id})
            if(!user) return done(null,false,{messages:"User not found"})
            return done(null,user);
        }catch(err){
            return done(err)
        }
    }))
    
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    
    passport.deserializeUser(async (id,done)=>{
        let result =  await UserServices.getBy({_id:id})
        done(null,result);
    })
}
export default initializePassport;