
import { IJwtPayload } from "./src/interfaces/jwt-payload.interface";
import { NodeEnvironment } from "./src/types/node-environment.type";

declare global {
    namespace Express {
        export interface Request {
            payload?: IJwtPayload, // Add the user property to the Request interface
            body: any,
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            EXPRESS_APP_PORT:number;
            NODE_ENV: NodeEnvironment;
            DATASOURCE_TYPE:MongoConnectionOptions["type"];
            DATASOURCE_HOST:MongoConnectionOptions["host"] 
            DATASOURCE_PORT:MongoConnectionOptions["port"]
            DATASOURCE_DATABASE:MongoConnectionOptions["database"]
            COMPANY:string;
            LOGO_URL:string;
            PORT:number;
            NANOID_SIZE:number;
            BCRYPT_SALT_ROUNDS:number|string;
            NODEMAILER_USERNAME : string;
            NODEMAILER_PASSWORD : string;
            ACCESS_TOKEN_SECRET :string;
            REFRESH_TOKEN_SECRET :string;
            ACCESS_TOKEN_EXPIRES_IN : string;
            REFRESH_TOKEN_EXPIRES_IN : string;
            ROOT_USERNAME: string;
            ROOT_EMAIL: string;
            ROOT_PASSWORD: string;
            ROOT_FULLNAME: string;
        }
    }
}

export {}
