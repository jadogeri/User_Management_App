
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";

import { TYPES } from "../types/binding.type";
import { AuthControllerInterface } from "../interfaces/auth-controller.interface";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";


@Route("auths")
@Tags("auth")
@Controller() 
export class AuthController extends BaseController implements AuthControllerInterface {

  @AutoWired(TYPES.AuthServiceInterface)
  private readonly authService!: AuthServiceInterface;


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

  @Post("/login")
  public async loginUser(): Promise<any> {
    return this.authService.login();

  }
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    return this.authService.logout();
  }
  @Post("/forgot")
  public async forgotUser(): Promise<any> {
    return this.authService.forgot();
  }
  @Post("/reset") 
  public async resetUser(): Promise<any> {
    return this.authService.reset();
  }
  @Delete("/deactivate")
  public async deactivateUser(): Promise<any> {
    return this.authService.deactivate();
  }
  /**
   * Creates a new user in the system.
   * @summary Create a new user
   * @param requestBody The user details for creation.
   * @returns The newly created user.
   */
  @SuccessResponse("201", "Created")
  @Post("/register")   
  public async registerUser(): Promise<any> {


    return this.authService.register();

  }

   @Post("/refresh")
  public async refreshToken(): Promise<any> {
    return this.authService.refresh();
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



