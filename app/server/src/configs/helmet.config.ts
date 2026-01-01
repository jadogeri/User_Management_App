import {HelmetOptions } from 'helmet';

export const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: false, // Disable CSP if necessary
  frameguard: { action: 'deny' }, // Configure frameguard
};  
