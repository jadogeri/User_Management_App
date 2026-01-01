
export interface BcryptServiceInterface {
  
  updateUUID(): void;

  getUUID(): string;

  generateUUID(): string;

  generateHashedPassword(plainTextPassword: string): Promise<string>;

  comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;

}