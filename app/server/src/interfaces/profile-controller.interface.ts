
export interface ProfileControllerInterface {
  createProfiile(): Promise<any> ;
  getProfile(): Promise<any>;
  updateProfile(): Promise<any>;
  replaceProfile(): Promise<any>;
  deleteProfile(): Promise<any>;
  
};
