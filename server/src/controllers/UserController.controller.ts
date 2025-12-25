
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse} from "tsoa";
import { AutoWired, Controller } from "../decorators";
import { IUserController } from "../interfaces/IUserController.interface";
import { IUserService } from "../interfaces/IUserService.interface";
import { TYPES } from "../types/binding.type";
import { UserCreationResponse } from "../dtos/responses/user-response.dto";
import { ErrorResponse } from "../models/error-response.model";
import { UserRegisterRequestDTO } from "../dtos/requests/user-request.dto";


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


  constructor() {
    super();
  }
  @Post("/login")
  public async loginUser(): Promise<any> {
    return this.userService.login();
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
  @Example<UserCreationResponse>({
    id: 1,
    username: "john1doe",
    fullname: "John Doe",
    email: "johndoe@tsoa.com",
    phone: "123-456-7890",
    age:21,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    updatedAt: new Date("2023-01-01T11:30:00Z"),
  })  
  @Post("/register")
  public async registerUser( requestBody: UserRegisterRequestDTO): Promise<UserCreationResponse |  ErrorResponse> {
    return this.userService.create();
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