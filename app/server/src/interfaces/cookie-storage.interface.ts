// Helper function to generate tokens
import { Response } from "express";

export interface CookieStorageInterface{
    
  setItem( res: Response, cookieName: string, refreshToken: string): string;
  clearItem(res: Response, cookieName: string): string

}

