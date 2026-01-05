
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";
import { TYPES } from "../types/binding.type";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { UserControllerInterface } from "../interfaces/user-controller.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { logger } from "../configs/logger.config";
import { UserCreateResponseDTO, UserReadResponseDTO } from "../dtos/responses/user-response.dto";
import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { ErrorResponse } from "../models/error-response.model";
import { ValidationResponse } from "../models/validation-response.model";
import { CredentialValidatorServiceInterface } from "../interfaces/credential-validator-service.interface";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { RoleNamesEnum } from "../types/role-names.type";
import { Action, Resource } from "../types/rbac.type";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { ConflictError } from "../errors/conflict.error";
import { InternalServerError } from "../errors/internal-server.error";
import { BadRequestError } from "../errors/bad-request.error";


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
      this.setStatus(errorResponse.getCode());
      return errorResponse;
    }   
    //calling user service
    const userResponse : ErrorResponse | UserCreateResponseDTO = await this.userService.create(userRequest);    

    return userResponse;

  }

  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID and receive corresponding user details.
   * @param userId The user's identifier
   * @example userId 1
   * @summary Gets a single user.
   * @returns The requested user.
   */
  @Example<UserReadResponseDTO>({
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
  @SuccessResponse("200", "OK")
  @Security("jwt", ["user:read"])
  @Get("{userId}")
  //@Middleware(loginLimitterMiddleware)
  public async getSingleUser(@Path() userId: number): Promise<UserReadResponseDTO | ErrorResponse> {
    if(!userId ){
      throw new BadRequestError("User ID is required");
    }
    if(!Number.isInteger(userId)){
      throw new BadRequestError(`User ID '${userId as any}' is not a valid integer`);
    }
    return this.userService.getOne(userId);

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



/**
 * 
 * 
{

    if(!mongoose.isObjectIdOrHexString(userId)){
      this.setStatus(400);      
      return {message: `id '${userId}' is not valid`}
    }

    const mongoId = new mongoose.Types.ObjectId(userId)
    return await this.userService.getOne(mongoId);
  }

 */