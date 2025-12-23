// src/ioc.config.ts
import { Container, decorate, injectable } from 'inversify';
import "reflect-metadata";
import { UserController } from '../controllers/UserController.controller';
import { Controller } from 'tsoa';
import { buildProviderModule } from "inversify-binding-decorators";
import { TYPES } from '../types/binding.type';
import { IUserService } from '../interfaces/IUserService.interface';
import { UserService } from '../services/UserService.service';


const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());


export const configureIOC = () => {
   // Bind the interface to the concrete implementation

    iocContainer.bind<UserController>(UserController).toSelf();

    //iocContainer.bind<UserController>(TYPES.IUserController).to(UserController).inSingletonScope();

    iocContainer.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

    return iocContainer

}

export { iocContainer };
