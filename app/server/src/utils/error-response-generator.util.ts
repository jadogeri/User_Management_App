import User from "../entities/user.entity";
import { ErrorResponse } from "../models/error-response.model";

/**
 * Creates an ErrorResponse object with the specified status code, message, and user details.
 * 
 * @param statusCode - The HTTP status code representing the error.
 * @param message - A descriptive message for the error.
 * @param user - The user object containing email and username for the error response.
 * @returns An instance of ErrorResponse populated with the provided details.
 * @throws Error if the user object is invalid or missing required properties.
 */
export const  errorResponseGenerator = (statusCode: number, message: string, user: User): ErrorResponse => {
   const errorResponse = new ErrorResponse(statusCode,message);
    errorResponse.setEmail(user.email);
    errorResponse.setUsername(user.username);
    return errorResponse;
}