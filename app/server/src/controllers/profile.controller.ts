
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity, Patch} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";
import { TYPES } from "../types/binding.type";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";

import { ProfileControllerInterface } from "../interfaces/profile-controller.interface";
import { ProfileServiceInterface } from "../interfaces/profile-service.interface";


@Route("profiles")
@Tags("Profile")
@Controller() 
export class ProfileController extends BaseController implements ProfileControllerInterface {

  @AutoWired(TYPES.ProfileServiceInterface)
  private readonly profileService!: ProfileServiceInterface;

  @Post()
  createProfiile(): Promise<any> {
    return this.profileService.create();
  }

  @Get()
  getProfile(): Promise<any> {
    return this.profileService.get();
  }
  @Patch()
  updateProfile(): Promise<any> {
    return this.profileService.update();
  }
  @Put()
  replaceProfile(): Promise<any> {
    return this.profileService.replace();
  }
  @Delete() 
  deleteProfile(): Promise<any> {
    return this.profileService.delete();
  }

}

