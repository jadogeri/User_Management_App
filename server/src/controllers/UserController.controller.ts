
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse} from "tsoa";
import { Controller } from "../decorators";
import { IUserController } from "../interfaces/IUserController.interface";


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

  private users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];


  constructor() {
    super();
  }
  @Post("/login")
  public async loginUser(): Promise<any> {
    return this.users;
  }
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    return this.users;
  }
  @Post("/forgot")
  public async forgotUser(): Promise<any> {
    return this.users;
  }
  @Post("/reset") 
  public async resetUser(): Promise<any> {
    return this.users;
  }
  @Delete("/deactivate")
  public async deleteUser(): Promise<any> {
    return this.users;
  }
  @Post("/register")
  public async createUser(): Promise<any> {
    return this.users;
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