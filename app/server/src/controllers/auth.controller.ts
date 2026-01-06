
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";

import { TYPES } from "../types/binding.type";
import { AuthControllerInterface } from "../interfaces/auth-controller.interface";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { AuthLoginRequestDTO, AuthRefreshTokenRequestDTO, AuthRegisterRequestDTO } from "../dtos/requests/auth-request.dto";
import { AuthCurrentResponseDTO, AuthLoginResponseDTO, AuthLogoutResponseDTO, AuthRegisterResponseDTO } from "../dtos/responses/auth-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { loginUserMiddleware } from "../middlewares/login-user.middleware";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { ValidationResponse } from "../models/validation-response.model";
import { BadRequestError } from "../errors/bad-request.error";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { Resource, Action } from "../types/rbac.type";
import { RoleNamesEnum } from "../types/role-names.type";
import { UserCreateResponseDTO } from "../dtos/responses/user-response.dto";
import { ConflictError } from "../errors/conflict.error";
import { InternalServerError } from "../errors/internal-server.error";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";



@Route("auths")
@Tags("Auth")
@Controller() 
export class AuthController extends BaseController implements AuthControllerInterface {

  @AutoWired(TYPES.AuthServiceInterface)
  private readonly authService!: AuthServiceInterface;
  @AutoWired(TYPES.CredentialValidatorServiceInterface)
  private readonly credentialValidatorService!: CredentialValidatorServiceInterface;


  /**
   * Authenticates a registered user.
   * @summary Authenticates an existing user
   * @param requestBody The user's credentials for authentication.
   * @returns A response containing the authenticated user's refresh and access tokens.
   */
  @SuccessResponse("200", "ok")
  @Response<ResourceNotFoundError>("404", "Resource Not Found")
  @Response<BadRequestError>("400", "Bad Request")
  @Example<AuthLoginResponseDTO>({
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicm9vdEBBZG1pbmlzdHJhdG9yMSIsImVtYWlsIjoicm9vdEBleGFtcGxlLmNvbSIsImlkIjoxLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoiQWRtaW5pc3RyYXRvcjogSGlnaGVzdCBsZXZlbDsgbWFuYWdlcyB1c2Vycywgc2V0dGluZ3MsIGFuZCBzeXN0ZW0gYWNjZXNzOyBjYW4gZG8gZXZlcnl0aGluZy4iLCJwZXJtaXNzaW9ucyI6W3siaWQiOjEsImRlc2NyaXB0aW9uIjoiRnVsbCBhY2Nlc3MgdG8gYWxsIHJlc291cmNlcy4iLCJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIn0seyJpZCI6MiwiZGVzY3JpcHRpb24iOiJDcmVhdGUgbmV3IHVzZXIuIiwicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9uIjoiY3JlYXRlIn0seyJpZCI6MywiZGVzY3JpcHRpb24iOiJSZWFkIG93biBkYXRhLiIsInJlc291cmNlIjoidXNlciIsImFjdGlvbiI6InJlYWQifSx7ImlkIjo0LCJkZXNjcmlwdGlvbiI6IlVwZGF0ZSBvd24gZGF0YS4iLCJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb24iOiJ1cGRhdGUifSx7ImlkIjo1LCJkZXNjcmlwdGlvbiI6IkRlbGV0ZSBvd24gcmVjb3JkLiIsInJlc291cmNlIjoidXNlciIsImFjdGlvbiI6ImRlbGV0ZSJ9LHsiaWQiOjksImRlc2NyaXB0aW9uIjoiUmVhZCBvd24gYXV0aCBkYXRhLiIsInJlc291cmNlIjoiYXV0aCIsImFjdGlvbiI6InJlYWQifSx7ImlkIjoxMCwiZGVzY3JpcHRpb24iOiJVcGRhdGUgb3duIGF1dGggZGF0YS4iLCJyZXNvdXJjZSI6ImF1dGgiLCJhY3Rpb24iOiJ1cGRhdGUifSx7ImlkIjoxMSwiZGVzY3JpcHRpb24iOiJDcmVhdGUgYXV0aCBkYXRhLiIsInJlc291cmNlIjoiYXV0aCIsImFjdGlvbiI6ImNyZWF0ZSJ9XX1dfSwic2NvcGVzIjpbIio6KiIsInVzZXI6Y3JlYXRlIiwidXNlcjpyZWFkIiwidXNlcjp1cGRhdGUiLCJ1c2VyOmRlbGV0ZSIsImF1dGg6cmVhZCIsImF1dGg6dXBkYXRlIiwiYXV0aDpjcmVhdGUiXSwiaWF0IjoxNzY3NjcwMzE0LCJleHAiOjE3NjgyNzUxMTR9.PCFsmtyNL1uFauuvfD38KTu927LjpzQDTQVJvC05ZM2",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicm9vdEBBZG1pbmlzdHJhdG9yMSIsImVtYWlsIjoicm9vdEBleGFtcGxlLmNvbSIsImlkIjoxLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoiQWRtaW5pc3RyYXRvcjogSGlnaGVzdCBsZXZlbDsgbWFuYWdlcyB1c2Vycywgc2V0dGluZ3MsIGFuZCBzeXN0ZW0gYWNjZXNzOyBjYW4gZG8gZXZlcnl0aGluZy4iLCJwZXJtaXNzaW9ucyI6W3siaWQiOjEsImRlc2NyaXB0aW9uIjoiRnVsbCBhY2Nlc3MgdG8gYWxsIHJlc291cmNlcy4iLCJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIn0seyJpZCI6MiwiZGVzY3JpcHRpb24iOiJDcmVhdGUgbmV3IHVzZXIuIiwicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9uIjoiY3JlYXRlIn0seyJpZCI6MywiZGVzY3JpcHRpb24iOiJSZWFkIG93biBkYXRhLiIsInJlc291cmNlIjoidXNlciIsImFjdGlvbiI6InJlYWQifSx7ImlkIjo0LCJkZXNjcmlwdGlvbiI6IlVwZGF0ZSBvd24gZGF0YS4iLCJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb24iOiJ1cGRhdGUifSx7ImlkIjo1LCJkZXNjcmlwdGlvbiI6IkRlbGV0ZSBvd24gcmVjb3JkLiIsInJlc291cmNlIjoidXNlciIsImFjdGlvbiI6ImRlbGV0ZSJ9LHsiaWQiOjksImRlc2NyaXB0aW9uIjoiUmVhZCBvd24gYXV0aCBkYXRhLiIsInJlc291cmNlIjoiYXV0aCIsImFjdGlvbiI6InJlYWQifSx7ImlkIjoxMCwiZGVzY3JpcHRpb24iOiJVcGRhdGUgb3duIGF1dGggZGF0YS4iLCJyZXNvdXJjZSI6ImF1dGgiLCJhY3Rpb24iOiJ1cGRhdGUifSx7ImlkIjoxMSwiZGVzY3JpcHRpb24iOiJDcmVhdGUgYXV0aCBkYXRhLiIsInJlc291cmNlIjoiYXV0aCIsImFjdGlvbiI6ImNyZWF0ZSJ9XX1dfSwic2NvcGVzIjpbIio6KiIsInVzZXI6Y3JlYXRlIiwidXNlcjpyZWFkIiwidXNlcjp1cGRhdGUiLCJ1c2VyOmRlbGV0ZSIsImF1dGg6cmVhZCIsImF1dGg6dXBkYXRlIiwiYXV0aDpjcmVhdGUiXSwiaWF0IjoxNzY3NjcwMzE0LCJleHAiOjE3NjgyNzUxMTR9.eLK-wWRy2D1DOxEjyFw_K4XMlS57kNXNeCgRy6GZ8J7"
  })  
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
  
  @Security("jwt",["auth:delete"])
  @Post("/logout")
  public async logoutUser(@Request() req: ExpressRequest): Promise<AuthLogoutResponseDTO> {
    const payload : JwtPayloadInterface= req.payload;
    console.log("Current user payload in controller: ", payload);
    const response = await this.authService.logout(payload);
    return response;
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
    @NoSecurity()
    @SuccessResponse("201", "Created")
    @Response<ErrorResponse>("404", "Not Found")
    @Response<ConflictError>("409", "Conflict")
    @Response<InternalServerError>("500", "Internal Server Error")
    @Response<ResourceNotFoundError>("404", "Resource Not Found")
    @Response<BadRequestError>("400", "Bad Request")
    @Example<UserCreateResponseDTO>({
      id: 1,
      username: "john1doe",
      fullname: "John Doe",
      email: "johndoe@tsoa.com",
      phone: "123-456-7890",
      createdAt: new Date("2023-01-01T10:00:00Z"),
      updatedAt: new Date("2023-01-01T11:30:00Z"),
      failedLogins: 0,
      isEnabled: false
    })  
    @Post("/register")   
    public async registerUser( @Body() requestBody: AuthRegisterRequestDTO): Promise<AuthRegisterResponseDTO |  ErrorResponse> {
  
      const userRequest : AuthRegisterRequestDTO = requestBody
      // calling validation service
      const validation : ValidationResponse = this.credentialValidatorService.validateRegistration(userRequest);
      if(!validation.isValid()){
        console.log("validation failed in controller", validation.getErrorResponse()?.getMessage());
        const errorResponse : ErrorResponse = validation.getErrorResponse() as ErrorResponse;
        this.setStatus(errorResponse.getCode());
        return errorResponse;
      }   
      //calling user service
      const userResponse : ErrorResponse | AuthRegisterResponseDTO = await this.authService.register(userRequest);    
  
      return userResponse;
  
    }
  

  /**
   * Creates a new refresh token in the system.
   * @summary Invalidate current refresh token and generate a new pair of tokens
   * @param requestBody The current refresh token.
   * @returns The newly created refresh and access tokens.
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



