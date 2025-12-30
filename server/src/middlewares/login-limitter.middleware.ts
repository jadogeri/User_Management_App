import { Request, Response, NextFunction } from 'express';
// Import the 'express-rate-limit' library
import rateLimit from 'express-rate-limit';

// Define the limiter configuration outside the middleware wrapper for clarity
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 2, // Allow only 5 login attempts per IP per 10 minutes
  handler: (req: Request, res: Response, next: NextFunction) => { // Handler function must also accept next
    res.status(429).send('Too many login attempts, please try again in 10 minutes.');
  },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// The middleware wrapper function now just returns the configured limiter
const loginLimitterMiddleware = loginLimiter;

export default loginLimitterMiddleware;
