
import { Response, NextFunction, Request } from "express";
import {jwtDecode} from 'jwt-decode';
import * as jwt from"jsonwebtoken";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';

interface AuthorizedRequest extends Request {
  headers: {
    authorization?: string; // Make it optional or required as needed
    [key: string]: any; // Allow other headers
  };
}

export const validateTokenMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    console.log("validate token middleware called", req);

  try{
  let token;
  let authHeader = req.headers?.authorization as string;
  console.log("authheader = ", authHeader)
  token = authHeader.split(" ")[1];  

  if (!authHeader || !authHeader.startsWith("Bearer")|| (token == null || token == undefined)) {

    res.status(401).json("User not authorized or token missing");
  }
  else{

    console.log('isExpired is:', isJwtTokenExpired(token));
    if(isJwtTokenExpired(token)){
      res.status(401);
      throw new Error("token has expired");
    }

    const decoded =  jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET as jwt.Secret)
    
    console.log("decoded = ", decoded)
    console.log('Decoded token :', decode(token));

    const decodedPayload =  jwtDecode<JwtPayloadInterface>(token);

    if(decoded ){
      req.payload = decodedPayload
      next();    


    }else{
      res.status(401);
      throw new Error("User not authorized!");
    }

  }
}catch(e : unknown){

  console.log("line 52 in middleware" + e)
}
};


