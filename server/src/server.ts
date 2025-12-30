import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import {buildApp} from "./app";
import { bindDataSource, iocContainer } from "./configs/ioc.config";
import { Application } from "express";
import { SQLiteService } from "./services/sqlite.service";

async function bootstrap() {
  try {
    // A. Resolve the service and connect
    const databaseService = iocContainer.get<SQLiteService>(SQLiteService);
    await databaseService.connect(); 

    const dataSource = databaseService.getDataSource();
    console.log("DataSource initialized:", dataSource.isInitialized);              

    // B. Inject the live DataSource into the container
    // This allows Repositories to resolve TYPES.DataSource
    bindDataSource(dataSource);

    // C. Now start the server
    const app: Application = buildApp();
    const port = process.env.PORT || 3000;   

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port , () => {
        console.log(`🚀 Server is running on: http://localhost:${port}`);
        console.log(`📚 API Documentation: http://localhost:${port}/docs`);
      });
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }

}

bootstrap();





