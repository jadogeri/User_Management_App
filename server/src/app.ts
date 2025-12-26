import express,{ Application, json, urlencoded} from 'express';
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { RegisterRoutes } from "./routes";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { corsOptions } from './configs/cors.config';

dotenv.config();

import "./controllers/user.controller";
import { errorHandler } from './middlewares/global-error-handler.middleware';
import { noRouteFoundHandler } from './middlewares/no-route-found-handler.middleware';


export const buildApp = () : Application  =>{

    const app: Application = express();

    //middlewares
    app.use(express.json())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Use the configured CORS middleware
    app.use(cors(corsOptions));
    // Enable pre-flight requests for all routes (necessary when using specific headers/methods)
    //app.options('*', cors(corsOptions) as any); 

    app.use(
    urlencoded({
        extended: true,
    })
    );
    app.use(json());

    RegisterRoutes(app);

    app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

    // app.use(globalErrorHandler);
    app.use(noRouteFoundHandler)
    app.use(errorHandler);

    return app;

}



