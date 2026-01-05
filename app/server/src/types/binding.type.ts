import AccessControlService from "../services/access-control.service";
import { AuthService } from "../services/auth.service";

// Define Symbols for DI binding (best practice in Inversify)
export const TYPES = {

    //controllers
    UserControllerInterface: Symbol.for("UserControllerInterface"),
    AuthControllerInterface: Symbol.for("AuthControllerInterface"),
    ProfileControllerInterface: Symbol.for("ProfileControllerInterface"),

    //services
    UserServiceInterface: Symbol.for("UserServiceInterface"),
    ProfileServiceInterface: Symbol.for("ProfileServiceInterface"),
    CredentialValidatorServiceInterface: Symbol.for("CredentialValidatorServiceInterface"),
    EmailServiceInterface: Symbol.for("EmailServiceInterface"),
    AuthServiceInterface: Symbol.for("AuthServiceInterface"),
    DatabaseServiceInterface: Symbol.for("DatabaseServiceInterface"),
    TokenGeneratorInterface: Symbol.for("TokenGeneratorInterface"),
    TokenValidatorInterface: Symbol.for("TokenValidatorInterface"),
    PasswordGeneratorInterface: Symbol.for("PasswordGeneratorInterface"),
    CookieStorageInterface: Symbol.for("CookieStorageInterface"),
    AccessControlInterface: Symbol.for("AccessControlInterface"),
    //repositories

    UserRepositoryInterface: Symbol.for("UserRepositoryInterface"),
    AuthRepositoryInterface: Symbol.for("AuthRepositoryInterface"),
    ProfileRepositoryInterface: Symbol.for("ProfileRepositoryInterface"),

    //classes
    DataSource: Symbol.for("DataSource"),
    UserService: Symbol.for('UserService'),

};