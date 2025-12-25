

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPRESS_APP_PORT:number;
            NODE_ENV:string;
            DATASOURCE_TYPE:MongoConnectionOptions["type"];
            DATASOURCE_HOST:MongoConnectionOptions["host"] 
            DATASOURCE_PORT:MongoConnectionOptions["port"]
            DATASOURCE_DATABASE:MongoConnectionOptions["database"]
            COMPANY:string;
            LOGO_URL:string;
            PORT:number;
            NANOID_SIZE:number;
            BCRYPT_SALT_ROUNDS:number;
            NODEMAILER_USERNAME : string;
            NODEMAILER_PASSWORD : string;
            JSON_WEB_TOKEN_SECRET :string;
        }
    }
}

export {}
