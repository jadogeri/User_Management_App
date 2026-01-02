// src/ioc.config.ts
import { Container, decorate, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { Controller } from 'tsoa';
import { buildProviderModule } from "inversify-binding-decorators";
import { TYPES } from '../types/binding.type';
import { AuthServiceInterface} from '../interfaces/auth-service.interface';
import { AuthService } from '../services/auth.service';
import { AuthRepositoryInterface } from '../interfaces/auth-repository.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthController } from '../controllers/auth.controller';
import { UserServiceInterface} from '../interfaces/user-service.interface';
import { UserService } from '../services/user.service';
import { UserRepositoryInterface } from '../interfaces/user-repository.interface';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../controllers/user.controller';

import { DatabaseServiceInterface } from '../interfaces/database-service.interface';
import { SQLiteService } from '../services/sqlite.service';
import PasswordGeneratorService from '../services/password-generator.service';
import { PasswordGeneratorInterface } from '../interfaces/password-generator.interface';
 import { CredentialValidatorServiceInterface } from '../interfaces/credential-validator-service.interface';
import CredentialValidatorService from '../services/credential-validator.service';
// import CredentialValidatorService from '../services/credential-validator.service';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import EmailService from '../services/email.service';
import { TokenGeneratorInterface } from '../interfaces/token-generator.interface';
import TokenGeneratorService from '../services/token-generator.service';
import { CookieStorageInterface } from '../interfaces/cookie-storage.interface';
import CookieStorageService from '../services/cookie-storage.service';
// // import { UserController } from '../controllers/user.controller';


// import TokenGeneratorService from '../services/token-generator.service';
// import { TokenGeneratorInterface } from '../interfaces/token-generator.interface';



const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());

  //  0. bind controllers
    iocContainer.bind<UserController>(UserController).toSelf();
    iocContainer.bind<AuthController>(AuthController).toSelf();

    // 1. Bind the service that manages the connection
    iocContainer.bind<SQLiteService>(SQLiteService).toSelf().inSingletonScope();
    iocContainer.bind<DatabaseServiceInterface>(TYPES.DatabaseServiceInterface).to(SQLiteService).inSingletonScope();
    iocContainer.bind<AuthServiceInterface>(TYPES.AuthServiceInterface).to(AuthService).inSingletonScope();
    iocContainer.bind<UserServiceInterface>(TYPES.UserServiceInterface).to(UserService).inSingletonScope();
    iocContainer.bind<PasswordGeneratorInterface>(TYPES.PasswordGeneratorInterface).to(PasswordGeneratorService).inSingletonScope();


    // 2. Bind the Repository (it will wait for TYPES.DataSource to be available)
    iocContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository).inSingletonScope();
    iocContainer.bind<AuthRepositoryInterface>(TYPES.AuthRepositoryInterface).to(AuthRepository).inSingletonScope();


    iocContainer.bind<CredentialValidatorServiceInterface>(TYPES.CredentialValidatorServiceInterface).to(CredentialValidatorService).inSingletonScope();
    iocContainer.bind<EmailServiceInterface>(TYPES.EmailServiceInterface).to(EmailService).inSingletonScope();  
    iocContainer.bind<TokenGeneratorInterface>(TYPES.TokenGeneratorInterface).to(TokenGeneratorService).inSingletonScope();
    iocContainer.bind<CookieStorageInterface>(TYPES.CookieStorageInterface).to(CookieStorageService).inSingletonScope();


// 3. Helper to bind the live DataSource after connection
/**
 * Binds a given DataSource instance to the IoC container as a constant value.
 * This allows for dependency injection of the DataSource throughout the application.
 * 
 * @param {DataSource} dataSource - The DataSource instance to be bound.
 * @returns {void}
 * @throws {Error} Throws an error if the binding fails.
 */
export const bindDataSource = (dataSource: DataSource) => {
  iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
};

export { iocContainer };





