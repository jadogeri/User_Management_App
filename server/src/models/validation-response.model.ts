import { ErrorResponse } from "./error-response.model";

export class ValidationResponse{

    private readonly valid: boolean; 
    private readonly errorResponse?: ErrorResponse

    constructor(valid : boolean, errorResponse?: ErrorResponse){
        this.valid = valid;
        this.errorResponse = errorResponse;
    }
    isValid(): boolean{
        return this.valid;
    } 

    getErrorResponse(): ErrorResponse | undefined{
        return this.errorResponse;
    }
    
}