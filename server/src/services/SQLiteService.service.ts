import { DataSource } from "typeorm";
import { IDatabaseService } from "../interfaces/IDatabaseService.interface";
import { Service } from "../decorators";
import { AppDataSource } from "../configs/typeOrm.config";

@Service()
export class SQLiteService implements IDatabaseService{
  
  private readonly dataSource: DataSource;
    
  constructor() {
    this.dataSource = AppDataSource
  }
  
  public async connect(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log("🛢️ SQLite3 Database connected and DataSource bound.");
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export default new SQLiteService().getDataSource();