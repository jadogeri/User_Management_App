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
import { UserCreateRequestDTO } from "../dtos/requests/user-request.dto";
import { EnabledStatus } from "../data/status.data";
import { UserRole } from "../data/role.data";
import { UserCreateResponseDTO, UserReadResponseDTO } from "../dtos/responses/user-response.dto";
import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { TokenGeneratorInterface } from "../interfaces/token-generator.interface";
import { PasswordGeneratorInterface } from "../interfaces/password-generator.interface";
import { ConflictError } from "../errors/conflict.error";
import { InternalServerError } from "../errors/internal-server.error";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { AppDataSource } from "../configs/typeOrm.config";
import { RoleNamesEnum } from "../types/role-names.type";
import { Resource } from "../types/rbac.type";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

@Service()
export class UserService implements UserServiceInterface{


    @AutoWired(TYPES.UserRepositoryInterface)
    private readonly userRepository!:  UserRepositoryInterface;
    @AutoWired(TYPES.EmailServiceInterface)
    private readonly emailService!:  EmailServiceInterface;
    @AutoWired(TYPES.AuthServiceInterface)
    private readonly authService!:  AuthServiceInterface;
    @AutoWired(TYPES.TokenGeneratorInterface)
    private readonly tokenGeneratorService!: TokenGeneratorInterface;
    @AutoWired(TYPES.PasswordGeneratorInterface)
    private readonly passwordGeneratorService!: PasswordGeneratorInterface;


    async getOne(userId: number): Promise<any> {
        const user = await this.userRepository.findById(userId);
        if(!user){
            throw new ResourceNotFoundError(`User with ID ${userId} not found.`);
        }
        const userResponse : UserReadResponseDTO ={
            username: user.username,
            email: user.email,
            phone: user.phone,
            failedLogins: user.failedLogins,
            isEnabled: user.isEnabled,
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            fullname: user.fullname
        }
        return userResponse;
    }
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    modify(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    reactivate(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deactivate(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}