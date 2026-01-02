import User from "../entities/user.entity";
import { ErrorResponse } from "../models/error-response.model";

export const  errorResponseGenerator = (statusCode: number, message: string, user: User): ErrorResponse => {
   const errorResponse = new ErrorResponse(statusCode,message);
    errorResponse.setEmail(user.email);
    errorResponse.setUsername(user.username);
    return errorResponse;
}