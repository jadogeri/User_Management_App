import dotenv from "dotenv";
dotenv.config();
import User from "../entities/user.entity";
import { AdminRole } from "./role.data";
import { EnabledStatus } from "./status.data";
import BcryptService from "../services/password-generator.service";

const bcryptService = new BcryptService();

const generateRootPassword = async () => {
    const password = process.env.ROOT_PASSWORD;
    console.log("Root password from env:", password);
    
    if (!password) {
        throw new Error("ROOT_PASSWORD is not defined in environment variables");
    }

    return await bcryptService.generateHashedPassword(password);
}

const generateRootUser = async () => {
    const root = new User();
    root.id = 1;
    root.username = process.env.ROOT_USERNAME!;
    root.email = process.env.ROOT_EMAIL;
    const hashedPassword =  await generateRootPassword();
    root.password = hashedPassword;
    root.roles = [AdminRole]
    root.status = EnabledStatus;
    root.createdAt = new Date();
    root.updatedAt = new Date();
    return root;
}


export { generateRootUser };


