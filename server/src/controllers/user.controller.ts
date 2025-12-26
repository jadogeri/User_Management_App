
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { IUserController } from "../interfaces/user-controller.interface";
import { IUserService } from "../interfaces/user-service.interface";
import { TYPES } from "../types/binding.type";
import { ErrorResponse } from "../models/error-response.model";
import { UserLoginRequestDTO, UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";
import { UserLoginResponseDTO, UserRegisterResponseDTO } from "../dtos/responses/user-response.dto";
import { ValidationResponse } from "../models/validation-response.model";
import { errorBroadcaster } from "../utils/errorBroadcaster";
import { ICredentialValidatorService } from "../interfaces/credential-validator-service.interface";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { validateTokenMiddleWare } from "../middlewares/validate-token.middleware";


interface ValidateErrorJSON {
  message: "Validation failed";
  details: string[];
}

/**
 * Controller for managing user-related operations.
 * Provides endpoints to retrieve and manage user profiles.
 */
@Route("users")
@Tags("User")
@Controller() 
@Response<ValidateErrorJSON>(422, "Validation Failed")
export class UserController extends BaseController implements IUserController {

  @AutoWired(TYPES.IUserService)
  private readonly userService!: IUserService;

  @AutoWired(TYPES.ICredentialValidatorService)
  private readonly credentialValidatorService: ICredentialValidatorService;


  constructor() {
    super();
  }

    /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */
  @SuccessResponse("201", "Created")
  @Example<UserRegisterResponseDTO>({
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
  @Get("/current")
  @Middleware(validateTokenMiddleWare)
  public async currentUser(@Request() req: IJwtPayload): Promise<any> {

    return req
  }
  @Post("/login")
  public async loginUser(userRequest: UserLoginRequestDTO): Promise<UserLoginResponseDTO | ErrorResponse> {
    return this.userService.login(userRequest);
  }
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    return this.userService.logout();
  }
  @Post("/forgot")
  public async forgotUser(): Promise<any> {
    return this.userService.forgot();
  }
  @Post("/reset") 
  public async resetUser(): Promise<any> {
    return this.userService.reset();
  }
  @Delete("/deactivate")
  public async deleteUser(): Promise<any> {
    return this.userService.delete();
  }
  /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */
  @SuccessResponse("201", "Created")
  @Example<UserRegisterResponseDTO>({
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
  public async registerUser( @Body() requestBody: UserRegisterRequestDTO): Promise<UserRegisterResponseDTO |  ErrorResponse> {


    const userRequest : UserRegisterRequestDTO = requestBody
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
  
  @Get("/")
  public async getUsers(
    // TSOA's @Request() decorator injects the Express request object
    @Request() req: Request ,
    // Note: TSOA automatically provides 'res' if you use the
    // the name 'res' as a parameter within the method signature.
    @Res() res: TsoaResponse<200, any>
  ): Promise<any> {
    try {
      // const users = await this.userService.findAll();
      // Placeholder for your actual logic
      const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

      // Manually send the JSON response
      return res(200, users);
    } catch (error) {
      // Manually handle errors if needed
      return ({ message: "Internal server error" });
    }
  }
    
}




