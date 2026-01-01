import { Service } from "../decorators";
import * as bcrypt from "bcrypt";
import {hash} from "bcrypt";
import { PasswordGeneratorInterface } from "../interfaces/password-generator.interface";


@Service()
export class PasswordGeneratorService implements PasswordGeneratorInterface{

    updateUUID(): void {
        throw new Error("Method not implemented.");
    }
    getUUID(): string {
        throw new Error("Method not implemented.");
    }
    generateUUID(): string {
        throw new Error("Method not implemented.");
    }
    async generateHashedPassword(plainTextPassword: string): Promise<string> {
        console.log("Generating hashed password with salt rounds:", process.env.BCRYPT_SALT_ROUNDS);
        const saltRoundsEnv = process.env.BCRYPT_SALT_ROUNDS;
        if (!saltRoundsEnv) {
            throw new Error("BCRYPT_SALT_ROUNDS is not defined in environment variables");
        }
        console.log("Plain text password:", plainTextPassword);
        const hashedPassword : string = await hash(plainTextPassword, Number.parseInt(saltRoundsEnv as string));
        return hashedPassword;
    }
    async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

}    

export default PasswordGeneratorService;
