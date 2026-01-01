


export interface UserControllerInterface {
  createUser( requestBody: UserRegisterRequestDTO): Promise<UserRegisterResponseDTO |  ErrorResponse> ;
  getSingleUser(): Promise<any>;
  getAllUsers(): Promise<any>;
  modifyUser(): Promise<any>;
  reactivateUser(): Promise<any>;
  deactivateUser( ): Promise<any> ;
};
