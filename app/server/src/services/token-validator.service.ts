import { Service } from "../decorators";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";
import * as jwt from 'jsonwebtoken';
import { decode, JwtPayload, SignOptions } from "jsonwebtoken";
import { StringValue } from 'ms'; 
import { TokenValidatorInterface } from "../interfaces/token-validator.interface";
import isJwtTokenExpired from "jwt-check-expiry";
import { UnAuthorizedError } from "../errors/unauthorized.error";
import { jwtDecode } from "jwt-decode";


@Service()
class TokenValidatorService implements TokenValidatorInterface {

    async verifyAccessToken(token: string): Promise<any> {
        console.log('isExpired is:', isJwtTokenExpired(token));
        if(isJwtTokenExpired(token)){
        throw new UnAuthorizedError("token has expired");
        }

        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret)
        
        console.log("decoded = ", decoded)
        console.log('Decoded token :', decode(token));

        const decodedPayload =  jwtDecode<JwtPayload>(token);

        const {user}  = decodedPayload
        console.log("decodedPayload user = ", user)
        const result = jwt.verify(token, process.env?.ACCESS_TOKEN_SECRET as jwt.Secret);
        return result;
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

    verifyRefreshToken = (token: string): string| JwtPayload | undefined => {
        try {
            return jwt.verify(token, process.env?.REFRESH_TOKEN_SECRET as jwt.Secret);
        } catch (err: unknown) {
            if (err instanceof jwt.JsonWebTokenError) { 
                console.log("Refresh token verification failed: ", err.message);
                return undefined;
            }
        }
    };
}

export default TokenValidatorService;

