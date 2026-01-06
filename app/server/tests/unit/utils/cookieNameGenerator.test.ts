import { cookieNameGenerator } from '../../../src/utils/cookie-name-generator.util';

// cookie-name-generator.util.spec.ts
describe('cookieNameGenerator() cookieNameGenerator method', () => {
  // Happy Paths
  describe('Happy Paths', () => {
    it('should generate the correct cookie name for a typical positive userId', () => {
      // Test aims to verify correct string generation for a standard userId
      const userId = 123;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_123');
    });

    it('should generate the correct cookie name for userId zero', () => {
      // Test aims to verify correct string generation when userId is zero
      const userId = 0;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_0');
    });

    it('should generate the correct cookie name for a large userId', () => {
      // Test aims to verify correct string generation for a large userId value
      const userId = 9876543210;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_9876543210');
    });

    it('should generate the correct cookie name for a negative userId', () => {
      // Test aims to verify correct string generation for a negative userId
      const userId = -42;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_-42');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should generate the correct cookie name for the minimum safe integer', () => {
      // Test aims to verify correct string generation for Number.MIN_SAFE_INTEGER
      const userId = Number.MIN_SAFE_INTEGER;
      const result = cookieNameGenerator(userId);
      expect(result).toBe(`refreshToken_user_${Number.MIN_SAFE_INTEGER}`);
    });

    it('should generate the correct cookie name for the maximum safe integer', () => {
      // Test aims to verify correct string generation for Number.MAX_SAFE_INTEGER
      const userId = Number.MAX_SAFE_INTEGER;
      const result = cookieNameGenerator(userId);
      expect(result).toBe(`refreshToken_user_${Number.MAX_SAFE_INTEGER}`);
    });

    it('should generate the correct cookie name for a floating point userId', () => {
      // Test aims to verify correct string generation for a floating point userId
      const userId = 3.14159;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_3.14159');
    });

    it('should generate the correct cookie name for a userId with exponential notation', () => {
      // Test aims to verify correct string generation for a userId in exponential notation
      const userId = 1e6;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_1000000');
    });

    it('should generate the correct cookie name for a userId with negative exponential notation', () => {
      // Test aims to verify correct string generation for a userId in negative exponential notation
      const userId = -1e6;
      const result = cookieNameGenerator(userId);
      expect(result).toBe('refreshToken_user_-1000000');
    });
  });
});