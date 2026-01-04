
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";
import { TYPES } from "../types/binding.type";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { UserControllerInterface } from "../interfaces/user-controller.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { logger } from "../configs/logger.config";
import { UserCreateResponseDTO, UserCurrentResponseDTO } from "../dtos/responses/user-response.dto";
import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { ErrorResponse } from "../models/error-response.model";
import { ValidationResponse } from "../models/validation-response.model";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { RoleNamesEnum } from "../types/role-names.type";
import { Action, Resource } from "../types/rbac.type";


@Route("users")
@Tags("User")
@Controller() 
export class UserController extends BaseController implements UserControllerInterface {

  @AutoWired(TYPES.UserServiceInterface)
  private readonly userService!: UserServiceInterface;
  @AutoWired(TYPES.CredentialValidatorServiceInterface)
  private readonly credentialValidatorService!: CredentialValidatorServiceInterface

/**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */
  @SuccessResponse("201", "Created")
  @Example<UserCreateResponseDTO>({
    id: 1,
    username: "john1doe",
    fullname: "John Doe",
    email: "johndoe@tsoa.com",
    phone: "123-456-7890",
    age: 21,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    updatedAt: new Date("2023-01-01T11:30:00Z"),
    failedLogins: 0,
    isEnabled: false
  })  
  @Post("/")   
  public async createUser( @Body() requestBody: UserCreateRequestDTO): Promise<UserCreateResponseDTO |  ErrorResponse> {

    const userRequest : UserCreateRequestDTO = requestBody
    // calling validation service
    const validation : ValidationResponse = this.credentialValidatorService.validateRegistration(userRequest);
    if(!validation.isValid()){
      console.log("validation failed in controller", validation.getErrorResponse()?.getMessage());
      const errorResponse : ErrorResponse = validation.getErrorResponse() as ErrorResponse;
      return errorResponse;
    }   
    //calling user service
    const userResponse : ErrorResponse | UserCreateResponseDTO = await this.userService.create(userRequest);    

    return userResponse;

  }

    /**
   * Gets current user credentials by access token.
   * @summary Gets authorized user jwt payload
   * @returns The current user's JWT payload.
   */
  @SuccessResponse("200", "OK")
  @Security("jwt", ["user:read"])
  @Example<UserCurrentResponseDTO>({
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

  @Get("/get-one")
  @Middleware(loginLimitterMiddleware)
  public async getSingleUser(): Promise<any> {
    return this.userService.getOne();

  }  

   @Security("jwt",[""])
  // @Middleware(loggerMiddleware)
  @Get("/get-all")
  public async getAllUsers(): Promise<any> {
    return this.userService.getAll();
  }
  @Put("/modify")
  public async modifyUser(): Promise<any> {
    return this.userService.modify();
  }
  @Delete("/deactivate") 
  public async deactivateUser(): Promise<any> {
    return this.userService.deactivate();
  }

  /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */

   @Post("/reactivate")
  public async reactivateUser(): Promise<any> {
    return this.userService.reactivate();
  } 

  @Get("/error")
  public async error(): Promise<any> {
    logger.error("This is a test error from error endpoint");
    return "Error logged";
  }

    @Get("/warn")
  public async warn(): Promise<any> {
    logger.warn("This is a test warn logger from warn endpoint"); 
    return "Warn logged";}

  
      @Get("/info")
  public async info(): Promise<any> {

    logger.info("This is a test info from info endpoint");
    return "Info logged";
  }
}



