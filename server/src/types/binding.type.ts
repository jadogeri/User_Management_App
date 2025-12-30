// Define Symbols for DI binding (best practice in Inversify)
export const TYPES = {

    //controllers
    UserControllerInterface: Symbol.for("UserControllerInterface"),
    AuthControllerInterface: Symbol.for("AuthControllerInterface"),

    //services
    UserServiceInterface: Symbol.for("UserServiceInterface"),
    CredentialValidatorServiceInterface: Symbol.for("CredentialValidatorServiceInterface"),
    EmailServiceInterface: Symbol.for("EmailServiceInterface"),
    AuthServiceInterface: Symbol.for("AuthServiceInterface"),
    DatabaseServiceInterface: Symbol.for("DatabaseServiceInterface"),
    TokenGeneratorInterface: Symbol.for("TokenGeneratorInterface"),
    //repositories

    UserRepositoryInterface: Symbol.for("UserRepositoryInterface"),
    AuthRepositoryInterface: Symbol.for("AuthRepositoryInterface"),

    //classes
    DataSource: Symbol.for("DataSource"),
    UserService: Symbol.for('UserService'),

};