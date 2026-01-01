import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { generateRootUser } from '../../data/user.data';
export default class UserSeeder implements Seeder {
/**
   * Checks for the existence of predefined status entities in the database 
   * and saves them if they do not already exist. 
   * 
   * @param dataSource - The data source used to access the repository.
   * @returns A promise that resolves to void.
   * @throws Any errors thrown by the repository methods during execution.
   */
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const rootUser = await generateRootUser();

    // Check if the user already exists by ID
    const existingUser = await userRepository.findOneBy({ id: rootUser.id });

    if (!existingUser) {
      await userRepository.save(rootUser);
    }
  }
}
