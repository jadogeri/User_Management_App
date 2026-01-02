import { Service } from "../decorators";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";
import { TokenValidatorInterface } from "../interfaces/token-validator.interface";


@Service()
class TokenValidatorService implements TokenValidatorInterface {

    verifyAccessToken= (token: string): string| JwtPayload | Error => {
        try {
            return jwt.verify(token, process.env?.ACCESS_TOKEN_SECRET as jwt.Secret);
        } catch (err: unknown) {
            console.log("Error verifying access token: ", err);
            return err as Error;
        }
    };

    verifyRefreshToken = (token: string): string| JwtPayload | Error => {
        try {
            
            return jwt.verify(token, process.env?.REFRESH_TOKEN_SECRET as jwt.Secret);
        } catch (err: unknown) {
            console.log("Error verifying refresh token: ", err);
            return err as Error;
        }
    };
}

export default TokenValidatorService;
