

export interface AuthServiceInterface{

  login(): Promise<any>;
  logout(): Promise<any>;
  forgot(): Promise<any>;
  reset(): Promise<any>;
  delete(): Promise<any>;
  register(): Promise<any>;
  refresh(): Promise<any>;
}

