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

@Service()
export class AuthService implements AuthServiceInterface{

    @AutoWired(TYPES.AuthRepositoryInterface)
    private readonly authRepository!:  AuthRepositoryInterface;

    login(): Promise<any> {
        return this.authRepository.login();
    }
    logout(): Promise<any> {
        return this.authRepository.logout();
    }
    forgot(): Promise<any> {
        return this.authRepository.forgot();
    }
    
    reset(): Promise<any> {
        return this.authRepository.reset();
    }

    refresh(): Promise<any> {
        return this.authRepository.refresh();
    }
    
}