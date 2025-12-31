import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'src/logs/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'src/logs/logsErrors.log'
        })
    ],
    format:  format.combine(
        format.timestamp(),
        format.json()
        
        // format.metadata()
        // format.prettyPrint()
    )
})

