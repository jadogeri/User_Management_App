import { STATUS_CODES } from "../constants/status-codes.constants";
import { Response, Request,NextFunction } from "express";
import { CustomError } from "../exceptions/custom-error.exception";
import { ValidateError } from "tsoa";
import { HttpError } from "../exceptions/http-error.exception";
export const globalErrorHandler = (err : unknown, req : Request, res : Response, next : NextFunction) => {

  console.log("calling handler..........................................")
  console.error(err); 
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if(err instanceof HttpError){
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  //CustomError is sublcass of Error
  if (err instanceof CustomError) {
  const statusCode = err.statusCode ? err.statusCode : 500;
  console.log("status codes: ", statusCode )
  switch (statusCode) {
    case STATUS_CODES.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.CONFLICT:
      res.status(statusCode).json({
        title: "Conflict",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.LOCKED_ACCOUNT:
      res.status(statusCode).json({
        title: "Locked account",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
   res.status(500).json({
      message: "Internal Server Error",
    })
      break;
  }
  }

}
