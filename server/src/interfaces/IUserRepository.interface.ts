
export interface IUserRepository  {
    findByName(name: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: any): Promise<any>;
}