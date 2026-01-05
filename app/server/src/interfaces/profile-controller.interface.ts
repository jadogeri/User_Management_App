
export interface ProfileControllerInterface {
  createProfile(): Promise<any> ;
  getProfile(): Promise<any>;
  updateProfile(): Promise<any>;
  replaceProfile(): Promise<any>;
  deleteProfile(): Promise<any>;
  
};
