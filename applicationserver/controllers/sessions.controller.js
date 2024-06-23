import { usersService } from "../services/users.service.js";
import { createHash, checkValidPassword } from "../../utils/utils.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { verifyEmailToken } from "../../config/passport.config.js";
import {loggersUtil} from "../../utils/logger.js"


const registerInit = async (req, res) => {
    res.render("register");
}

const register = async (req, res) => {
    loggersUtil.logger.info('register');
    console.log(req.body)
    try {
        const { first_name, last_name, email, password,age } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        loggersUtil.logger.info('register ' + result);
        console.log(result);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        loggersUtil.logger.error('register Error:' + error.message);
        //res.status(500).send(error.message);
    }
}

const loginInit = async (req, res) => {
    loggersUtil.logger.info('loginInit');
    res.render("login");
}

const login = async (req, res) => {
    loggersUtil.logger.info('login');
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if(!user) {
        loggersUtil.logger.info('login User does not exist');
        return res.status(404).send({status:"error",error:"User doesn't exist"});
    }
    const isValidPassword = await checkValidPassword(user,password);
    if(!isValidPassword){
        loggersUtil.logger.info('login Incorrect password');
        return res.status(400).send({status:"error",error:"Incorrect password"});
    }
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('coderCookie',token,{maxAge:3600000}).render("productsHome");
    
    
    //.send({status:"success",message:"Logged in"})
}

const passwordRestoreInit = async (req, res) => {
    loggersUtil.logger.info('passwordRestoreInit');
    res.render("passwordRestore");
}

const passwordRestore = async (req, res) => {
    loggersUtil.logger.info('passwordRestore');
    try {
      let { email, password, confirm } = req.body;
      const token = req.cookies.emailToken;
      const isValidToken = verifyEmailToken(token);
      if (!isValidToken) {
        let msg = "El enlace ha expirado";
        return res.render("login", { msg });
      }
      const user = await userService.getUserByEmail(email);
  
      if (user && password && confirm && password === confirm) {
        const currentPassword = await userService.getByCreds(email, password);
        if (!currentPassword) {
          await userService.updatePassword(email, password);
          let msg = "Contraseña cambiada con éxito";
          res.render("login", { msg });
        } else {
          let msg = "No puede utilizar la contraseña anterior";
          res.render("login", { msg });
        }
      }
    } catch (error) {
      //req.logger.ERROR(error.message);
      loggersUtil.logger.error('passwordRestore Error:' + error.message);
      res.status(500).send(error.message);
    }
  }


const current = async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}

const unprotectedLogin  = async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
    const isValidPassword = await checkValidPassword(user,password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
    const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
}
const unprotectedCurrent = async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}

 const sessionsController  = {
    current,
    login,
    loginInit,
    register,
    registerInit,
    passwordRestore,
    passwordRestoreInit,
    current,
    unprotectedLogin,
    unprotectedCurrent
}

export default sessionsController;