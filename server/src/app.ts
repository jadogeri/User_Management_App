import express,{ Application } from 'express';
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { RegisterRoutes } from "./routes";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { corsOptions } from './configs/cors.config';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';


dotenv.config();

import "./controllers/auth.controller";
// import { globalErrorHandler } from './middlewares/global-error-handler.middleware';
// import { noRouteFoundHandler } from './middlewares/no-route-found-handler.middleware';

export const buildApp = () : Application  =>{

    const app: Application = express();

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

    RegisterRoutes(app);

    app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

    // app.use(globalErrorHandler);
    // app.use(noRouteFoundHandler)

    return app;

}



