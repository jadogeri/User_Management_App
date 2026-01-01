import User from "../entities/user.entity";
import { AdminRole } from "./role.data";
import { EnabledStatus } from "./status.data";
import BcryptService from "../services/bcrypt.service";

const bcryptService = new BcryptService();

const generateRootPassword = async () => {
    return await bcryptService.generateHashedPassword("@RootPass123!");
}

const generateRootUser = async () => {
    const root = new User();
    root.id = 1;
    root.username = "root@Administrator1";
    root.fullname = "Root User";
    root.email = "root@example.com";
    const hashedPassword =  await generateRootPassword();
    root.password = hashedPassword;
    root.role = AdminRole;
    root.status = EnabledStatus;
    root.createdAt = new Date();
    root.updatedAt = new Date();
    root.age = 30;
    return root;
}


export { generateRootUser };


