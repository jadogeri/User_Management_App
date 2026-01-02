// Helper function to generate tokens
import { Request, Response } from "express";

export interface CookieStorageInterface{
    
  setItem( res: Request, cookieName: string, refreshToken: string): Response<any>;
  clearItem(res: Request, cookieName: string): Response<any>;

}

