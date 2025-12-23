
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


  constructor() {
    super();
  }
  loginUser(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  logoutUser(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  forgotUser(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  resetUser(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteUser(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  createUser(): Promise<any> {
    throw new Error("Method not implemented.");
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