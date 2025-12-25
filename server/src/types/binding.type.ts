// Define Symbols for DI binding (best practice in Inversify)
export const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IUserRepository: Symbol.for("IUserRepository"),
    ICredentialValidatorService: Symbol.for("ICredentialValidatorService"),
    IUserController: Symbol.for("IUserController"),
    IDatabaseService: Symbol.for("IDatabaseService"),
    DataSource: Symbol.for("DataSource"),
    UserService: Symbol.for('UserService'),
    IEmailService: Symbol.for("IEmailService"),
};