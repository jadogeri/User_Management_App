// src/ioc.config.ts
import { Container, decorate, injectable } from 'inversify';
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
import { SQLiteService} from '../services/SQLiteService.service';    
import { DataSource } from 'typeorm';



const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());

    // 1. Bind the service that manages the connection
    iocContainer.bind<SQLiteService>(SQLiteService).toSelf().inSingletonScope();
    iocContainer.bind<MongoDBService>(MongoDBService).toSelf().inSingletonScope();
    // 2. Bind the Repository (it will wait for TYPES.DataSource to be available)
    iocContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();

    iocContainer.bind<UserController>(UserController).toSelf();

    iocContainer.bind<IDatabaseService>(TYPES.IDatabaseService).to(SQLiteService).inSingletonScope();
    iocContainer.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
   // Bind the interface to the concrete implementation
    //iocContainer.bind<MongoDBService>(MongoDBService).to(MongoDBService).inSingletonScope();
    //iocContainer.bind<SQLiteService>(SQLiteService).to(SQLiteService).inSingletonScope();




// 3. Helper to bind the live DataSource after connection
export const bindDataSource = (dataSource: DataSource) => {
  iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
};

export { iocContainer };





