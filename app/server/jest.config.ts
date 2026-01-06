// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // Handle the '.js' extension requirement in ESM imports
    '^(\\.{1,2}/.*)\\.js$': '$1','^@src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  setupFiles: ['./tests/setupTests.ts'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],

  // This allows Faker and typeorm-extension to work in 2026
  transformIgnorePatterns: [
    "node_modules/(?!(@faker-js/faker|typeorm-extension)/)"
  ],
};

export default config;
