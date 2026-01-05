

// Define Symbols for DI binding (best practice in Inversify)
export const TYPES = {

    //controllers
    UserControllerInterface: Symbol.for("UserControllerInterface"),
    AuthControllerInterface: Symbol.for("AuthControllerInterface"),
    ProfileControllerInterface: Symbol.for("ProfileControllerInterface"),
    ContactControllerInterface: Symbol.for("ContactControllerInterface"),

    //services
    UserServiceInterface: Symbol.for("UserServiceInterface"),
    ProfileServiceInterface: Symbol.for("ProfileServiceInterface"),
    ContactServiceInterface: Symbol.for("ContactServiceInterface"),
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
    ContactRepositoryInterface: Symbol.for("ContactRepositoryInterface"),

    //classes
    DataSource: Symbol.for("DataSource"),
    UserService: Symbol.for('UserService'),

};