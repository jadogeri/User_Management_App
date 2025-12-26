import { STATUS_CODES} from "../constants/status-codes.constants";
import { Response, Request,NextFunction } from "express";
export const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case STATUS_CODES.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.CONFLICT:
      res.json({
        title: "Conflict",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.LOCKED_ACCOUNT:
      res.json({
        title: "Locked account",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
};
