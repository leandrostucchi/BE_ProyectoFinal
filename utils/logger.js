import winston  from 'winston';
import __dirname from './utils.js';

const customLevelsOptions ={
    levels:{
        fatal: 0,
        error: 1,
        warning:2,
        info:3,
        debug:4,
        http:5,
    },
    colors:{
        fatal:'red',
        error: 'orange',
        warning:'yellow',
        info:'blue',
        debug:'white',
        http:'green',

    },
    levelsName:{
        fatal: 'fatal',
        error: 'error',
        warning:'warning',
        info:'info',
        debug:'debug',
        http:'http',
    },


}

const logger = winston.createLogger({
    level: customLevelsOptions.levels,
    format: winston.format.combine(
        //winston.format.colorize({colors:customLevelsOptions.colors}),
        winston.format.simple(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(info =>  `[${info.timestamp}]-[${info.level}]-[${info.message}]`)
    ),
    transports:[
        new (winston.transports.Console)({
            level:customLevelsOptions.levelsName.info,
        }),
        new (winston.transports.File)({
            level:customLevelsOptions.levelsName.info,
            filename:`./src/logs/${customLevelsOptions.levelsName.info}.log`,
            maxsize:5120000,
            maxFiles:5,
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename:`./src/logs/${customLevelsOptions.levelsName.error}.log`,
            level: customLevelsOptions.levelsName.error,
            colorize: true,
            prettyPrint: true,
            maxsize:5120000,
            maxFiles:5,
        })

    ]
})


const addLogger = (req,res,next) => {
    req.logger = logger;
    let mensaje = `${req.method}-${req.url}`;
    /*
     levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
    */
    //console.log("req.logger.levels " + req.logger.levels)    
    switch (req.logger.levels) {
        case 0:
            req.logger.error(mensaje);
            break;
        case 1:
            req.logger.warn(mensaje);  
            break;
        case 2:
            req.logger.info(mensaje);  
            break;
        case 3:
            req.logger.http(mensaje);  
            break;
        case 4:
            req.logger.verbose(mensaje);  
            break;
        case 5:
            req.logger.debug(mensaje);  
            break;
        case 6:
            req.logger.silly(mensaje);  
            break;
        default:
            req.logger.debug(mensaje);  
            break;
      }
    next();
}


export const loggersUtil  = {
    addLogger,
    logger,
}