import express,{ Application } from 'express';
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./routes";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { corsOptions } from './configs/cors.config';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import expressWinston from 'express-winston';
import { transports, format } from 'winston';

// importing controllers to ensure they are registered
import "./controllers/user.controller";
import "./controllers/auth.controller";

import { helmetOptions } from './configs/helmet.config';
import { applicationErrorLogger } from './middlewares/application-error-logger.middleware';
import { customLogger } from './middlewares/custom-logger.middleware';
// import { globalErrorHandler } from './middlewares/global-error-handler.middleware';
// import { noRouteFoundHandler } from './middlewares/no-route-found-handler.middleware';

export const buildApp = () : Application  =>{

    const app: Application = express();

    app.use(customLogger);
    //middlewares
    app.use(express.json())
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Use the configured CORS middleware
    app.use(cors(corsOptions));
    // Enable pre-flight requests for all routes (necessary when using specific headers/methods)
    //app.options('*', cors(corsOptions) as any); 
    const morganFormat = process?.env?.NODE_ENV === 'production' ? 'combined' : 'dev';
    app.use(morgan(morganFormat));// Logging middleware     
    // Create a write stream (in append mode)
    console.log("__dirname:", __dirname);   
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

    // Setup the logger to use the 'combined' format and stream to the file
    app.use(morgan('combined', { stream: accessLogStream }))  

    // Rate Limiting Middleware
    // Global rate limiter configuration
    const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
        'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    // Apply the rate limiting middleware to all requests
    app.use(apiLimiter);
    // Security Middleware
    app.use(helmet(helmetOptions));


    RegisterRoutes(app);

    app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

        console.log("dirname in app.ts:", __dirname);

    // Serve static files from the React build directory
    // The path.join ensures it works correctly across different operating systems
    const buildPath = path.join(__dirname, '../..', 'client', 'build');
    app.use(express.static(buildPath));

    // All other GET requests not handled by previous routes
    // (including the static files middleware) will be handled here
    // This ensures that React Router works correctly for client-side routing
    app.get('/*splat', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });




//     const myFormat  = format.printf(({ level: string, meta: any, timestamp }) => {
//     return `${timestamp} ${level}: ${meta.message}`
// })

// app.use(expressWinston.errorLogger({
//     transports: [
//         new transports.File({
//             filename: 'logsInternalErrors.log'
//         })
//     ],
//     format: format.combine(
//         format.json(),
//         format.timestamp(),
//         //myFormat

//     )
// }))

app.use(applicationErrorLogger);


    // app.use(globalErrorHandler);
    // app.use(noRouteFoundHandler)

    return app;
    
}



