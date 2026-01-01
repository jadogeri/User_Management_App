import { BcryptServiceInterface } from "../interfaces/bcrypt-service.interface";
import * as bcrypt from "bcrypt";


 
export class BcryptService implements BcryptServiceInterface{


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
        const hashedPassword : string = await bcrypt.hash(plainTextPassword, process.env.BCRYPT_SALT_ROUNDS || 10);
        return hashedPassword;
    }
    async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

}    

export default BcryptService;
