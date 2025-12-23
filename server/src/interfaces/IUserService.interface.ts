export interface IUserService{
  login(): Promise<any>;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  delete(): Promise<any>;
  create(): Promise<any>;
}