import { AutoWired, Service } from "../decorators";
import { ErrorResponse } from "../models/error-response.model";
import {hash} from "bcrypt";
import * as bcrypt from "bcrypt";
import { TYPES } from "../types/binding.type";
import { User } from "../entities/user.entity";
import { Recipient } from "../types/recipient.type";
import { AuthServiceInterface } from "../interfaces/auth-service.interface";
import { Auth } from "../entities/auth.entity";
import { Request } from "express";
import { AuthRepositoryInterface } from "../interfaces/auth-repository.interface";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Service()
export class UserService implements UserServiceInterface{

    @AutoWired(TYPES.UserRepositoryInterface)
    private readonly userRepository!:  UserRepositoryInterface;

    create(): any {
        return {message: "Create user endpoint from service"};
    }
    getOne(): Promise<any> {
        return this.userRepository.getOne();
    }
    getAll(): Promise<any> {
        return this.userRepository.getAll();
    }
    modify(): Promise<any> {
        return this.userRepository.modify();
    }
    reactivate(): Promise<any> {
        return this.userRepository.reactivate();
    }
    deactivate( ): Promise<any> {
        return this.userRepository.deactivate();
    }

    
}