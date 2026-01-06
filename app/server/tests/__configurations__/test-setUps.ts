// test/test-setup.ts
import { StartedTestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import User from '../../src/entities/user.entity';

let container: StartedTestContainer;
let connection: DataSource;

export const createTestConnection = async () => {
  // Start the PostgreSQL container
  container = await new PostgreSqlContainer('postgres:15')
    .withDatabase('test_db')
    .withUsername('test')
    .withPassword('test')
    .withExposedPorts(5432)
    .start();

  // Get container connection details
  const host = container.getHost();
  const port = container.getMappedPort(5432);

  // Create TypeORM DataSource
  connection = new DataSource({
    type: 'postgres',
    host: host,
    port: port,
    username: 'test',
    password: 'test',
    database: 'test_db',
    entities: ["../../src/entities/**/*.ts"], // Adjust path to your entities
    synchronize: true, // Automatically create schema for tests
    logging: false,
  });

  await connection.initialize();
  return connection;
};

export const closeTestConnection = async () => {
  if (connection) {
    await connection.destroy();
  }
  if (container) {
    await container.stop();
  }
};

export const getTestConnection = () => connection;
