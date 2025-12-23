// src/ioc.config.ts
import { Container, decorate, injectable } from 'inversify';
import "reflect-metadata";
import { UserController } from '../controllers/UserController.controller';
import { Controller } from 'tsoa';
import { buildProviderModule } from "inversify-binding-decorators";
import { TYPES } from '../types/binding.type';
import { IUserService } from '../interfaces/IUserService.interface';
import { UserService } from '../services/UserService.service';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { UserRepository } from '../repositories/UserRepository.repository';


const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());


export const configureIOC = () => {
   // Bind the interface to the concrete implementation

    iocContainer.bind<UserController>(UserController).toSelf();

    //iocContainer.bind<UserController>(TYPES.IUserController).to(UserController).inSingletonScope();

    iocContainer.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
    iocContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
    iocContainer.bind<IDataSource>(TYPES.DataSource).toConstantValue(/* your DataSource instance here */);


    return iocContainer

}

export { iocContainer };
