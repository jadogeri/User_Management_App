// src/database/seeds/StatusSeeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Status } from '../../entities/status.entity';
import { EnabledStatus, DisabledStatus, LockedStatus } from '../../data/status.data';

export default class StatusSeeder implements Seeder {
/**
   * Checks for the existence of predefined status entities in the database 
   * and saves them if they do not already exist. 
   * 
   * @param dataSource - The data source used to access the repository.
   * @returns A promise that resolves to void.
   * @throws Any errors thrown by the repository methods during execution.
   */
  public async run(dataSource: DataSource): Promise<void> {
    const statusRepository = dataSource.getRepository(Status);
    const statuses = [EnabledStatus, DisabledStatus, LockedStatus];
    
    for (const status of statuses) {
      // Check if the status already exists by ID
      const existingStatus = await statusRepository.findOneBy({ id: status.id });
      
      if (!existingStatus) {
        await statusRepository.save(status);
      }
    }
  }
}