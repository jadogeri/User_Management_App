


export interface UserControllerInterface {
  createUser(): Promise<any>;
  getSingleUser(): Promise<any>;
  getAllUsers(): Promise<any>;
  modifyUser(): Promise<any>;
  reactivateUser(): Promise<any>;
  deactivateUser( ): Promise<any> ;
};
