


export interface AuthControllerInterface {
  currentUser(): Promise<any>;
  loginUser(): Promise<any>;
  logoutUser(): Promise<any>;
  forgotUser(): Promise<any>;
  resetUser(): Promise<any>;
  deleteUser(): Promise<any>;
  registerUser(): Promise<any>;
  refreshToken( ): Promise<any> ;
};
