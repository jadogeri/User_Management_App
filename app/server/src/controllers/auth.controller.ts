
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";

import { TYPES } from "../types/binding.type";
import { AuthControllerInterface } from "../interfaces/auth-controller.interface";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { AuthLoginRequestDTO, AuthRefreshTokenRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { loginUserMiddleware } from "../middlewares/login-user.middleware";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { ValidationResponse } from "../models/validation-response.model";
import { BadRequestError } from "../errors/bad-request.error";



@Route("auths")
@Tags("Auth")
@Controller() 
export class AuthController extends BaseController implements AuthControllerInterface {

  @AutoWired(TYPES.AuthServiceInterface)
  private readonly authService!: AuthServiceInterface;
  @AutoWired(TYPES.CredentialValidatorServiceInterface)
  private readonly credentialValidatorService!: CredentialValidatorServiceInterface;


    /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */
  @SuccessResponse("201", "Created")
  @Get("/current")
  public async currentUser(): Promise<any> {
    return {message: "Current user endpoint" };
  }
  @Middleware(loginUserMiddleware("",["user:read"]))
  @Post("/login")
  public async loginUser(@Body() userRequest: AuthLoginRequestDTO, @Request() req: ExpressRequest): Promise<AuthLoginResponseDTO | ErrorResponse> {

    console.log("In login controller with request: ", userRequest); 
    // calling validation service
    const validation : ValidationResponse = this.credentialValidatorService.validateLogin(userRequest);
    if(!validation.isValid()){
      const errorResponse : ErrorResponse = validation.getErrorResponse() as ErrorResponse;
      return errorResponse;
    }
    //calling service
    const userResponse : ErrorResponse | AuthLoginResponseDTO = await this.authService.login(userRequest, req);  
    
    if(userResponse instanceof ErrorResponse){
      return userResponse;
    }
    return userResponse;
  }
  
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    return this.authService.logout();
  }
  @Post("/forgot-password")
  public async forgotUser(): Promise<any> {
    return this.authService.forgot();
  }
  @Post("/reset-password") 
  public async resetUser(): Promise<any> {
    return this.authService.reset();
  }

  /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */

   @Post("/refresh")
  public async refreshToken(@Body() userRequest: AuthRefreshTokenRequestDTO, @Request() req: ExpressRequest): Promise<any> {
    const { refreshToken } = userRequest;
    console.log("In refresh token controller with refreshToken: ", refreshToken); 
    if(!refreshToken || refreshToken.trim() === ""){ 
      throw new BadRequestError("Refresh token is required");
    }

    return this.authService.refresh(refreshToken, req);
  }

  
  @Get("/")
  public async getUsers(
    // TSOA's @Request() decorator injects the Express request object
    @Request() req: Request ,
    // Note: TSOA automatically provides 'res' if you use the
    // the name 'res' as a parameter within the method signature.
    @Res() res: TsoaResponse<200, any>
  ): Promise<any> {
      // const users = await this.userService.findAll();
      // Placeholder for your actual logic
      const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

      // Manually send the JSON response
      return res(200, users);

  }
    
}



