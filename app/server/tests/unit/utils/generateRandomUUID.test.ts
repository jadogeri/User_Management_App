import { customAlphabet } from "nanoid";
import { generateRandomUUID } from '../../../src/utils/generate-random-uuid.util';

// app/server/src/utils/generate-random-uuid.util.spec.ts
// Mock customAlphabet from nanoid
jest.mock("nanoid", () => ({
  customAlphabet: jest.fn(),
}));

// Mock nolookalikes from nanoid-dictionary
jest.mock("nanoid-dictionary", () => ({
  nolookalikes: 'abcdef123456',
}));

describe('generateRandomUUID() generateRandomUUID method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    beforeEach(() => {
      // Reset mock before each test
      (customAlphabet as jest.Mock).mockReset();
    });

    it('should generate a random string of the specified length (length = 10)', () => {
      // This test aims to verify that the function returns a string of the correct length.
      const mockNanoid = jest.fn().mockReturnValue('abcdefghij');
      (customAlphabet as jest.Mock).mockReturnValue(mockNanoid);

      const result = generateRandomUUID(10);

      expect(customAlphabet).toHaveBeenCalledWith('abcdef123456', 10);
      expect(mockNanoid).toHaveBeenCalled();
      expect(result).toBe('abcdefghij');
      expect(result.length).toBe(10);
    });

    it('should generate a random string of the specified length (length = 1)', () => {
      // This test aims to verify that the function works for the minimum valid length of 1.
      const mockNanoid = jest.fn().mockReturnValue('a');
      (customAlphabet as jest.Mock).mockReturnValue(mockNanoid);

      const result = generateRandomUUID(1);

      expect(customAlphabet).toHaveBeenCalledWith('abcdef123456', 1);
      expect(mockNanoid).toHaveBeenCalled();
      expect(result).toBe('a');
      expect(result.length).toBe(1);
    });

    it('should generate different strings for different lengths', () => {
      // This test aims to verify that the function returns strings of the correct, varying lengths.
      const mockNanoid5 = jest.fn().mockReturnValue('abcde');
      const mockNanoid8 = jest.fn().mockReturnValue('abcdefgh');
      (customAlphabet as jest.Mock)
        .mockReturnValueOnce(mockNanoid5)
        .mockReturnValueOnce(mockNanoid8);

      const result5 = generateRandomUUID(5);
      const result8 = generateRandomUUID(8);

      expect(result5).toBe('abcde');
      expect(result5.length).toBe(5);
      expect(result8).toBe('abcdefgh');
      expect(result8.length).toBe(8);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    beforeEach(() => {
      (customAlphabet as jest.Mock).mockReset();
    });

    it('should throw an error if length is negative', () => {
      // This test aims to verify that the function throws an error for negative length.
      expect(() => generateRandomUUID(-1)).toThrow('Invalid length');
      expect(customAlphabet).not.toHaveBeenCalled();
    });

    it('should allow length of zero (returns empty string)', () => {
      // This test aims to verify that the function allows length zero and returns an empty string.
      // According to the implementation, only length < 0 throws, so length 0 is allowed.
      const mockNanoid = jest.fn().mockReturnValue('');
      (customAlphabet as jest.Mock).mockReturnValue(mockNanoid);

      const result = generateRandomUUID(0);

      expect(customAlphabet).toHaveBeenCalledWith('abcdef123456', 0);
      expect(mockNanoid).toHaveBeenCalled();
      expect(result).toBe('');
      expect(result.length).toBe(0);
    });

    it('should handle very large length values', () => {
      // This test aims to verify that the function can handle large length values.
      const largeLength = 1000;
      const mockString = 'a'.repeat(largeLength);
      const mockNanoid = jest.fn().mockReturnValue(mockString);
      (customAlphabet as jest.Mock).mockReturnValue(mockNanoid);

      const result = generateRandomUUID(largeLength);

      expect(customAlphabet).toHaveBeenCalledWith('abcdef123456', largeLength);
      expect(mockNanoid).toHaveBeenCalled();
      expect(result).toBe(mockString);
      expect(result.length).toBe(largeLength);
    });

    it('should use the nolookalikes alphabet from nanoid-dictionary', () => {
      // This test aims to verify that the function uses the nolookalikes alphabet.
      const mockNanoid = jest.fn().mockReturnValue('abc');
      (customAlphabet as jest.Mock).mockReturnValue(mockNanoid);

      generateRandomUUID(3);

      expect(customAlphabet).toHaveBeenCalledWith('abcdef123456', 3);
    });
  });
});