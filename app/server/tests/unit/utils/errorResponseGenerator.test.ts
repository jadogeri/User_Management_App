import User from "../../../src/entities/user.entity";
import { errorResponseGenerator } from '../../../src/utils/error-response-generator.util';

// Jest mock for User

// Jest mock for ErrorResponse
const mockSetEmail = jest.fn();
const mockSetUsername = jest.fn();

jest.mock("../../../src/models/error-response.model", () => {
  return {
    ErrorResponse: jest.fn().mockImplementation((statusCode: number, message: string) => {
      return {
        getCode: () => statusCode,
        getMessage: () => message,
        setEmail: jest.mocked(mockSetEmail),
        setUsername: jest.mocked(mockSetUsername),
      };
    }),
  };
});

describe('errorResponseGenerator() errorResponseGenerator method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should generate an ErrorResponse with correct statusCode, message, email, and username', () => {
      // Test: Standard input values
      const statusCode = 400;
      const message = 'Invalid request';
      const user = {
        email: 'user1@example.com',
        username: 'user1',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe(message);
      expect(mockSetEmail).toHaveBeenCalledWith('user1@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('user1');
    });

    it('should handle different status codes and messages', () => {
      // Test: Different status code and message
      const statusCode = 404;
      const message = 'Not found';
      const user = {
        email: 'user2@example.com',
        username: 'user2',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe(message);
      expect(mockSetEmail).toHaveBeenCalledWith('user2@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('user2');
    });

    it('should work with long strings for email and username', () => {
      // Test: Long string values
      const statusCode = 500;
      const message = 'Internal server error';
      const user = {
        email: 'averylongemailaddressfortestingpurposes@example.com',
        username: 'averylongusernametotestedgecases',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe(message);
      expect(mockSetEmail).toHaveBeenCalledWith('averylongemailaddressfortestingpurposes@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('averylongusernametotestedgecases');
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle empty string for email and username', () => {
      // Test: Empty string values
      const statusCode = 401;
      const message = 'Unauthorized';
      const user = {
        email: '',
        username: '',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe(message);
      expect(mockSetEmail).toHaveBeenCalledWith('');
      expect(mockSetUsername).toHaveBeenCalledWith('');
    });

    it('should handle special characters in email and username', () => {
      // Test: Special characters
      const statusCode = 403;
      const message = 'Forbidden';
      const user = {
        email: 'weird+chars!@example.com',
        username: 'user!@#',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe(message);
      expect(mockSetEmail).toHaveBeenCalledWith('weird+chars!@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('user!@#');
    });

    it('should handle zero and negative status codes', () => {
      // Test: Zero status code
      const statusCodeZero = 0;
      const messageZero = 'Zero status';
      const userZero = {
        email: 'zero@example.com',
        username: 'zero',
      } as unknown as jest.Mocked<User>;

      const resultZero = errorResponseGenerator(statusCodeZero, messageZero, userZero);

      expect(resultZero.getCode()).toBe(statusCodeZero);
      expect(resultZero.getMessage()).toBe(messageZero);
      expect(mockSetEmail).toHaveBeenCalledWith('zero@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('zero');

      // Test: Negative status code
      const statusCodeNegative = -1;
      const messageNegative = 'Negative status';
      const userNegative = {
        email: 'negative@example.com',
        username: 'negative',
      } as unknown as jest.Mocked<User>;

      const resultNegative = errorResponseGenerator(statusCodeNegative, messageNegative, userNegative);

      expect(resultNegative.getCode()).toBe(statusCodeNegative);
      expect(resultNegative.getMessage()).toBe(messageNegative);
      expect(mockSetEmail).toHaveBeenCalledWith('negative@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('negative');
    });

    it('should handle empty string message', () => {
      // Test: Empty message string
      const statusCode = 418;
      const message = '';
      const user = {
        email: 'emptymsg@example.com',
        username: 'emptymsg',
      } as unknown as jest.Mocked<User>;

      const result = errorResponseGenerator(statusCode, message, user);

      expect(result.getCode()).toBe(statusCode);
      expect(result.getMessage()).toBe('');
      expect(mockSetEmail).toHaveBeenCalledWith('emptymsg@example.com');
      expect(mockSetUsername).toHaveBeenCalledWith('emptymsg');
    });
  });
});