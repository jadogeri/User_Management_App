
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity, Patch} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";
import { TYPES } from "../types/binding.type";
import loginLimitterMiddleware from "../middlewares/login-limitter.middleware";

import { ContactControllerInterface } from "../interfaces/contact-controller.interface";
import { ContactServiceInterface } from "../interfaces/contact-service.interface";


@Route("contacts")
@Tags("Contact")
@Controller() 
export class ContactController extends BaseController implements ContactControllerInterface {

  @AutoWired(TYPES.ContactServiceInterface)
  private readonly contactService!: ContactServiceInterface;

  @Post()
  createContact(): Promise<any> {
    return this.contactService.create();
  }

  @Get()
  getContact(): Promise<any> {
    return this.contactService.get();
  }
  @Patch()
  updateContact(): Promise<any> {
    return this.contactService.update();
  }
  @Put()
  replaceContact(): Promise<any> {
    return this.contactService.replace();
  }
  @Delete() 
  deleteContact(): Promise<any> {
    return this.contactService.delete();
  }

}

