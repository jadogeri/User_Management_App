import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
// Import the winston-daily-rotate-file module. It is imported for its side effects, 
// adding 'DailyRotateFile' to the winston.transports namespace.
import DailyRotateFile from 'winston-daily-rotate-file'; // Import the type for explicit use

const app = express();
const { combine, json, timestamp } = winston.format;

// 1. Create a DailyRotateFile transport instance for error logs
const errorLogTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'src/logs/logsInternalErrors-%DATE%.log', // %DATE% is a placeholder for the date pattern
  datePattern: 'YYYY-MM-DD', // Rotate daily
  level: 'error',
  zippedArchive: true, // Zip archived files
  maxSize: '20m', // Maximum file size
  maxFiles: '14d' // Retain logs for 14 days
});

// Optional: Listen for transport events (e.g., rotate, error)
errorLogTransport.on('rotate', (oldFilename, newFilename) => {
  console.log(`Log file rotated from ${oldFilename} to ${newFilename}`);
});

export const applicationErrorLogger = expressWinston.errorLogger({
  transports: [
    errorLogTransport, // Use the configured daily rotate file transport
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
  ],
  format: combine(
    json(),
    timestamp()
  )
});