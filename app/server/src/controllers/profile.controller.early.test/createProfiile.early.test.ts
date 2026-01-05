import { ProfileServiceInterface } from "../../interfaces/profile-service.interface";
import { ProfileController } from '../profile.controller';

// Manual mock for UserCreateResponseDTO
interface MockUserCreateResponseDTO {
  id: number;
  email: string;
  username: string;
  age: number;
  fullname: string;
  phone: string;
}



// Mock implementation for ProfileServiceInterface
class MockProfileService implements ProfileServiceInterface {
  public create = jest.fn();
  public get = jest.fn();
  public update = jest.fn();
  public replace = jest.fn();
  public delete = jest.fn();
}

describe('ProfileController.createProfiile() createProfiile method', () => {
  let controller: ProfileController;
  let mockProfileService: MockProfileService;

  beforeEach(() => {
    // Initialize controller and inject mock service
    controller = new ProfileController();
    mockProfileService = new MockProfileService();
    (controller as any).profileService = mockProfileService as any;
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should return a valid profile creation response when service resolves successfully', async () => {
      // This test aims to verify that a successful profile creation returns the expected DTO.
      const mockResponse: MockUserCreateResponseDTO = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        age: 30,
        fullname: 'Test User',
        phone: '1234567890',
      };
      jest.mocked(mockProfileService.create).mockResolvedValue(mockResponse as any as never);

      const result = await controller.createProfiile();

      expect(result).toEqual(mockResponse as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple profile creation calls with different data', async () => {
      // This test aims to verify that multiple calls to createProfiile can return different results.
      const mockResponse1: MockUserCreateResponseDTO = {
        id: 2,
        email: 'user2@example.com',
        username: 'user2',
        age: 25,
        fullname: 'User Two',
        phone: '2222222222',
      };
      const mockResponse2: MockUserCreateResponseDTO = {
        id: 3,
        email: 'user3@example.com',
        username: 'user3',
        age: 40,
        fullname: 'User Three',
        phone: '3333333333',
      };
      jest.mocked(mockProfileService.create)
        .mockResolvedValueOnce(mockResponse1 as any as never)
        .mockResolvedValueOnce(mockResponse2 as any as never);

      const result1 = await controller.createProfiile();
      const result2 = await controller.createProfiile();

      expect(result1).toEqual(mockResponse1 as any);
      expect(result2).toEqual(mockResponse2 as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(2);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should propagate errors thrown by the profileService.create method', async () => {
      // This test aims to verify that errors from the service are propagated by the controller.
      const error = new Error('Service error');
      jest.mocked(mockProfileService.create).mockRejectedValue(error as never);

      await expect(controller.createProfiile()).rejects.toThrow('Service error');
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service returning an empty object', async () => {
      // This test aims to verify that an empty object response is handled gracefully.
      jest.mocked(mockProfileService.create).mockResolvedValue({} as any as never);

      const result = await controller.createProfiile();

      expect(result).toEqual({} as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service returning a profile with minimal valid data', async () => {
      // This test aims to verify that minimal valid data is accepted and returned.
      const minimalProfile: MockUserCreateResponseDTO = {
        id: 4,
        email: 'min@example.com',
        username: 'minuser',
        age: 0,
        fullname: '',
        phone: '',
      };
      jest.mocked(mockProfileService.create).mockResolvedValue(minimalProfile as any as never);

      const result = await controller.createProfiile();

      expect(result).toEqual(minimalProfile as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service returning a profile with very large values', async () => {
      // This test aims to verify that large values in the response are handled correctly.
      const largeProfile: MockUserCreateResponseDTO = {
        id: Number.MAX_SAFE_INTEGER,
        email: 'large@example.com',
        username: 'largeuser',
        age: 120,
        fullname: 'A'.repeat(1000),
        phone: '9'.repeat(20),
      };
      jest.mocked(mockProfileService.create).mockResolvedValue(largeProfile as any as never);

      const result = await controller.createProfiile();

      expect(result).toEqual(largeProfile as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service returning a profile with special characters', async () => {
      // This test aims to verify that special characters in the response are handled correctly.
      const specialProfile: MockUserCreateResponseDTO = {
        id: 5,
        email: 'special@exämple.com',
        username: 'spécial_user',
        age: 35,
        fullname: 'Üser Nämé',
        phone: '+1-800-555-!@#$',
      };
      jest.mocked(mockProfileService.create).mockResolvedValue(specialProfile as any as never);

      const result = await controller.createProfiile();

      expect(result).toEqual(specialProfile as any);
      expect(mockProfileService.create).toHaveBeenCalledTimes(1);
    });
  });
});