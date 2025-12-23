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
import { MongoDBService } from '../services/MongoDBService.service';
import { IDatabaseService } from '../interfaces/IDatabaseService.interface';
import { DataSource } from 'typeorm/data-source/DataSource';


const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());


export const configureIOC = () => {
   // Bind the interface to the concrete implementation
    iocContainer.bind<UserController>(UserController).toSelf();
    iocContainer.bind<MongoDBService>(MongoDBService).toSelf()

    //iocContainer.bind<UserController>(TYPES.IUserController).to(UserController).inSingletonScope();

    iocContainer.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
    iocContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
    iocContainer.bind<IDatabaseService>(TYPES.IDatabaseService).to(MongoDBService).inSingletonScope();
    iocContainer.bind<DataSource>(DataSource).toConstantValue(iocContainer.get(MongoDBService).getDataSource()); // Bind DataSource instance


    //iocContainer.bind<IDatabaseService>(TYPES.IDatabaseService).to(MongoDBService).inSingletonScope();
   // Bind the interface to the concrete implementation

    return iocContainer

}

export { iocContainer };
