
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";

import { TYPES } from "../types/binding.type";
import { AuthControllerInterface } from "../interfaces/auth-controller.interface";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";
import { UserControllerInterface } from "../interfaces/user-controller.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";


@Route("users")
@Tags("Users")
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
  @Post("/create")
  public async createUser(): Promise<any> {
    return this.userService.create();
  }

  @Post("/get-one")
  @Middleware(loginLimitterMiddleware)
  public async getSingleUser(): Promise<any> {
    return this.userService.getOne();

  }  
  @Post("/get-all")
  public async getAllUsers(): Promise<any> {
    return this.userService.getAll();
  }
  @Post("/modify")
  public async modifyUser(): Promise<any> {
    return this.userService.modify();
  }
  @Post("/deactivate") 
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
    
}



