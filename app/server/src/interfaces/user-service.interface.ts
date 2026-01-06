


export interface UserServiceInterface {
  getOne(userId: number): Promise<any>;
  getAll(): Promise<any>;
  modify(): Promise<any>;
  reactivate(): Promise<any>;
  deactivate( ): Promise<any> ;
};
