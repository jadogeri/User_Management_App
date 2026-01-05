
export interface ContactControllerInterface {
  createContact(): Promise<any> ;
  getContact(): Promise<any>;
  updateContact(): Promise<any>;
  replaceContact(): Promise<any>;
  deleteContact(): Promise<any>;
  
};
