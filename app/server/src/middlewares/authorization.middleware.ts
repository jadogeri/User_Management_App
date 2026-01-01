import { Request, Response, NextFunction } from 'express';
import { expressAuthorization } from '../utils/authorization.util';

export const authMiddleware = (securityName: string, scopes?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      // Call your existing function
      const user = await expressAuthorization(req, securityName, scopes);
      console.log("user=============",user);
      
      // Attach the result to the request for use in controllers
      (req as any).user = user;
      
      next();
    } catch (error: any) {
      res.status(401).json({ message: error.message || 'Unauthorized' });
    }
  };
};
