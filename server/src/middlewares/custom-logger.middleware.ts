import { logger } from "../configs/logger.config";
import * as expressWinston from 'express-winston';

export const customLogger = expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
});