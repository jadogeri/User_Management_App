import { Service } from "../decorators";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";
import * as jwt from 'jsonwebtoken';
import { SignOptions } from "jsonwebtoken";
import { StringValue } from 'ms'; 


@Service()
class TokenGeneratorService implements TokenGeneratorInterface {

    constructor(){ }

    generateAccessToken(payload: JwtPayloadInterface): string{  
        
        let secretKey  = process.env?.ACCESS_TOKEN_SECRET as jwt.Secret;

        console.log("Generating access token with secretKey:", secretKey);

        const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue  || '10m';

        const options: SignOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };

        const accessToken: string = jwt.sign(payload, secretKey, options);
        
        console.log("Generated Access Token: ", accessToken);

        return accessToken;
    }
    generateRefreshToken(payload: JwtPayloadInterface): string{ 
        

        let secretKey  = process.env?.REFRESH_TOKEN_SECRET as jwt.Secret;

        console.log("Generating refresh token with secretKey:", secretKey);

        const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue  || '7d'; 
        const options: SignOptions = { expiresIn: REFRESH_TOKEN_EXPIRES_IN };

        const refreshToken: string = jwt.sign(payload, secretKey, options);
        
        console.log("Generated Refresh Token: ", refreshToken);

        return refreshToken;
    }
}

export default TokenGeneratorService;

