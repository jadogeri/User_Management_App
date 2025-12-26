import { Request } from "express";

export interface IJwtPayload extends Request {
  user:{
    username:string;
    email:string
    id: number
  };
  token: string;
}