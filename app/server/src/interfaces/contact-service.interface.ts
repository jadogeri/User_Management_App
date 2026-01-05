
export interface ContactServiceInterface {
  create(): Promise<any> ;
  get(): Promise<any>;
  update(): Promise<any>;
  replace(): Promise<any>;
  delete(): Promise<any>;
  
};
