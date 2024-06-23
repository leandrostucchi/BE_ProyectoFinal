import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import passport from 'passport';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log (__dirname)


export default __dirname;

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const checkValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

export const cookieExtractor = req =>{
  let token = null;
  if (req && req.cookies)
  {
      token = req.cookies[config.jwt.cookie_name];
  }
  return token;
}


export const passportCall = (strategy) =>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info) {
          if (err) return next(err);
          if (!user) {
              return res.status(401).send({error:info.messages?info.messages:info.toString()});
          }
          req.user = user;
          next();
        })(req, res, next);
      }
}