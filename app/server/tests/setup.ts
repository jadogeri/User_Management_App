import { jest } from '@jest/globals';

jest.mock('@faker-js/faker', () => ({
  faker: {
    person: { fullName: () => 'Test User' },
    internet: { email: () => 'test@example.com', userName: () => 'testuser' },
    lorem: { sentence: () => 'Sample description', word: () => 'test' },
    datatype: { number: () => 1, boolean: () => true },
    helpers: { arrayElement: (arr: any[]) => arr[0] }
  }
}));