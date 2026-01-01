


export interface UserServiceInterface {
  create(): Promise<any>;
  getOne(): Promise<any>;
  getAll(): Promise<any>;
  modify(): Promise<any>;
  reactivate(): Promise<any>;
  deactivate( ): Promise<any> ;
};
