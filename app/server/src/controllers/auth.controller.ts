
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";

import { TYPES } from "../types/binding.type";
import { AuthControllerInterface } from "../interfaces/auth-controller.interface";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { AuthLoginRequestDTO, AuthRefreshTokenRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthCurrentResponseDTO, AuthLoginResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { loginUserMiddleware } from "../middlewares/login-user.middleware";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { ValidationResponse } from "../models/validation-response.model";
import { BadRequestError } from "../errors/bad-request.error";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { Resource, Action } from "../types/rbac.type";
import { RoleNamesEnum } from "../types/role-names.type";



@Route("auths")
@Tags("Auth")
@Controller() 
export class AuthController extends BaseController implements AuthControllerInterface {

  @AutoWired(TYPES.AuthServiceInterface)
  private readonly authService!: AuthServiceInterface;
  @AutoWired(TYPES.CredentialValidatorServiceInterface)
  private readonly credentialValidatorService!: CredentialValidatorServiceInterface;


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

  
      /**
     * Gets current user credentials by access token.
     * @summary Gets authorized user jwt payload
     * @returns The current user's JWT payload.
     */
    @SuccessResponse("200", "OK")
    @Security("jwt", ["user:read"])
    @Example<AuthCurrentResponseDTO>({
    user: {
      username: "John1Doe",
      email: "JohnDoe@gmail.com",
      id: 2,
      roles: [
        {
          id: 2,
          users:[],
          name: RoleNamesEnum.USER,
          description: "Regular User: Standard access; can use application features but has limited administrative capabilities.",
          permissions: [
            {
              id: 2,
              description: "Create new user.",
              resource: Resource.USER,
              action: Action.CREATE,
              roles:[],
              rbacPermission:() => 'user:create',
            },
            {
              id: 3,
              description: "Read own data.",
              resource : Resource.USER,
              action: Action.READ,
              roles:[],
              rbacPermission:() => 'user:read', 
            }
          ]
        }
      ]
    },
    "scopes": [
      "user:create",
      "user:read",
    ],
    "iat": 1767492049,
    "exp": 1767492109
  }) 
    @Get("/current")
    public async currentUser(@Request() req: ExpressRequest): Promise<JwtPayloadInterface> {
      const payload : JwtPayloadInterface= req.payload;
      console.log("Current user payload in controller: ", payload);
      return payload;
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



