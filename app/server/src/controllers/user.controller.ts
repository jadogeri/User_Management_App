
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";

import { TYPES } from "../types/binding.type";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { UserControllerInterface } from "../interfaces/user-controller.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { logger } from "../configs/logger.config";
import { UserCreateResponseDTO } from "../dtos/responses/user-response.dto";
import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";


@Route("users")
@Tags("User")
@Controller() 
export class UserController extends BaseController implements UserControllerInterface {

  @AutoWired(TYPES.UserServiceInterface)
  private readonly userService!: UserServiceInterface;


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
  @Post("/register")   
  public async registerUser( @Body() requestBody: UserCreateRequestDTO): Promise<UserCreateResponseDTO |  ErrorResponse> {


    const userRequest : UserCreateRequestDTO = requestBody
    // calling validation service
    const validation : ValidationResponse = this.credentialValidatorService.validateRegistration(userRequest);
    if(!validation.isValid()){
      console.log("validation failed in controller", validation.getErrorResponse()?.getMessage());
      const errorResponse : ErrorResponse = validation.getErrorResponse() as ErrorResponse;
      return errorResponse;
      //errorBroadcaster(res,errorResponse.getCode(), errorResponse.getMessage())
    }   
    //calling user service
    const userResponse : ErrorResponse | UserRegisterResponseDTO = await this.userService.register(userRequest);    

    return userResponse;


  }

  @Get("/get-one")
  @Middleware(loginLimitterMiddleware)
  public async getSingleUser(): Promise<any> {
    return this.userService.getOne();

  }  
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



