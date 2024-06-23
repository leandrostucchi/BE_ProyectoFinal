import dotenv, { config } from 'dotenv';

dotenv.config()
// dotenv.config({
//     path: `./.env.${mode}`,
//   });
  
console.log("process.env.JWT_SECRET " +process.env.JWT_SECRET)
console.log('process.env.MONGODBWEB ' + process.env.MONGODBWEB)
export default {
    mongo:{
        url:process.env.MONGO_URL
    },
    aws:{
        access_key:process.env.AWS_ACCESS_KEY,
        secret:process.env.AWS_SECRET
    },
    jwt:{
        cookie_name:process.env.JWT_COOKIE_NAME,
        secret:process.env.JWT_SECRET
    },
    session:{
        SUPERADMIN:process.env.SUPERADMIN,
        SUPERADMIN_PASSWORD:process.env.SUPERADMIN_PASSWORD
    },
    port: process.env.PORT,
    mongodbweb: process.env.MONGODBWEB,
    mongodblocal: process.env.MONGODBLOCAL,
    secret_cookie: process.env.SECRET_COOKIE,
    secretCode: process.env.SECRETCODE,
    ttl: process.env.TTL,
    privateKey: process.env.PRIVATE_KEY,
}

//console.log("config.jwt.secret " + {jwt: jwt.secret})