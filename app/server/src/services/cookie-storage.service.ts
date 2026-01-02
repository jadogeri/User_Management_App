import { Request, Response } from "express";
import { Service } from "../decorators";
import { CookieStorageInterface } from "../interfaces/cookie-storage.interface";

@Service()
class CookieStorageService implements CookieStorageInterface {

    setItem(req: Request, cookieName: string, refreshToken: string): Response<any> {
        const res = req.res;
        console.log("res path is " + req.path);
        if (res) {
            return res.cookie(cookieName, refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax', // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
            });
        }  
        return undefined as any;
    }
    clearItem(req: Request, cookieName: string): Response<any>{
        const res = req.res;
        console.log("res path is " + req.path);
        if (res) {
            return res.clearCookie(cookieName, {
                path: req.path, // CRITICAL: Must match the path used when the cookie was set
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                // Note: Do not include maxAge here
            })
        }
        return undefined as any;
    }

}

export default CookieStorageService;

