import { DataSource } from "typeorm";

export interface DatabaseServiceInterface {
  connect(): Promise<void> ;

  getDataSource(): DataSource ;
}