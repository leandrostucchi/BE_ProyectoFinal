import express  from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";


import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

import __dirname from "./utils/utils.js";
import {loggersUtil} from "./utils/logger.js"

import config from "./config/config.js";

import usersRouter from "./routes/users.routes.js"
import sessionRouter from "./routes/sessions.router.js";
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js";


import path from "path";

import initializePassport from "./config/passport.config.js";



const port = config.port;
const mongodbweb= config.mongodbweb;
const mongodblocal= config.mongodblocal;
const secret_cookie= config.secret_cookie;
const secretCode= config.secretCode;
const ttl= config.ttl;


const app = express();
app.use(loggersUtil.addLogger);

const httpServer =  app.listen(
    port,() =>{loggersUtil.logger.info('Servidor arriba  puerto:' + port)}
)


const io = new Server(httpServer);

initializePassport();

app.use(cookieParser(secret_cookie));
app.use(session({
    store:MongoStore.create({
        mongoUrl:mongodbweb,
        //mongoUrl:mongodblocal,
        //mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:ttl,
    }),
    secret:secretCode,
    resave:true,
    saveUninitialized:true
}))


//mongoose.connect(mongodblocal)
mongoose.connect(mongodbweb )
.then(success => loggersUtil.logger.info('Conectado a la base'))
.catch(error =>{
    if(error){
      loggersUtil.logger.error('No se pudo conectar a la base ' + error);
      process.exit(1);
    }
  });


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(loggersUtil.addLogger);

//ROUTES
app.use("/api/sessions", sessionRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



app.engine("handlebars", handlebars.engine());
//app.set("views", __dirname + "/views");
app.set("views", path.join(__dirname, '../views'));
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");



app.get('/ping',(req,res) =>{
  loggersUtil.logger.info('/ping ' + ' pong');  
  res.send('pong') 

})

app.get("/:universalURL", (req, res) => { 
  loggersUtil.logger.error('/:universalURL ' + '404 URL NOT FOUND');
    res.status(404).send({
      status:404,
      result:"error",
      error:'404 URL NOT FOUND'
    });
}); 
  

app.get('/',(req,res) =>{
  res.render("home")
})