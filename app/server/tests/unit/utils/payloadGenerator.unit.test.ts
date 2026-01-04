import User from "../../../src/entities/user.entity";
import { ResourceNotFoundError } from "../../../src/errors/resource-not-found.error";
import { payloadGenerator } from '../../../src/utils/payload-generator.util';

// payload-generator.util.spec.ts
// Manual mock for Role (structure only, as needed for tests)
class Role {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

describe('payloadGenerator() payloadGenerator method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should generate a valid payload for a user with multiple roles and permissions', () => {
      // This test ensures payloadGenerator returns correct payload for a user with multiple roles and permissions.
      const mockRoles = [new Role('admin'), new Role('user')];
      const mockUser = {
        username: 'john_doe',
        email: 'john@example.com',
        id: 123,
        roles: mockRoles,
        getPermissionNames: jest.fn().mockReturnValue(['user:create', 'user:read']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result).toEqual({
        user: {
          username: 'john_doe',
          email: 'john@example.com',
          id: 123,
          roles: mockRoles,
        },
        scopes: ['user:create', 'user:read'],
      });
      expect(jest.mocked(mockUser.getPermissionNames)).toHaveBeenCalled();
    });

    it('should generate a payload for a user with no roles', () => {
      // This test ensures payloadGenerator works for a user with an empty roles array.
      const mockUser = {
        username: 'jane_doe',
        email: 'jane@example.com',
        id: 456,
        roles: [],
        getPermissionNames: jest.fn().mockReturnValue(['auth:read']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result).toEqual({
        user: {
          username: 'jane_doe',
          email: 'jane@example.com',
          id: 456,
          roles: [],
        },
        scopes: ['auth:read'],
      });
      expect(jest.mocked(mockUser.getPermissionNames)).toHaveBeenCalled();
    });

    it('should generate a payload for a user with no permissions', () => {
      // This test ensures payloadGenerator works for a user whose getPermissionNames returns an empty array.
      const mockRoles = [new Role('viewer')];
      const mockUser = {
        username: 'viewer_user',
        email: 'viewer@example.com',
        id: 789,
        roles: mockRoles,
        getPermissionNames: jest.fn().mockReturnValue([]) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result).toEqual({
        user: {
          username: 'viewer_user',
          email: 'viewer@example.com',
          id: 789,
          roles: mockRoles,
        },
        scopes: [],
      });
      expect(jest.mocked(mockUser.getPermissionNames)).toHaveBeenCalled();
    });

    it('should include additional user properties if present', () => {
      // This test ensures payloadGenerator includes extra properties on the user object.
      const mockRoles = [new Role('custom')];
      const mockUser = {
        username: 'extra_user',
        email: 'extra@example.com',
        id: 321,
        roles: mockRoles,
        customField: 'customValue',
        getPermissionNames: jest.fn().mockReturnValue(['system:read']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result.user.username).toBe('extra_user');
      expect(result.user.email).toBe('extra@example.com');
      expect(result.user.id).toBe(321);
      expect(result.user.roles).toEqual(mockRoles);
      expect(result.scopes).toEqual(['system:read']);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should throw ResourceNotFoundError if user is undefined', () => {
      // This test ensures payloadGenerator throws ResourceNotFoundError when user is undefined.
      expect(() => payloadGenerator(undefined as unknown as User)).toThrow(ResourceNotFoundError);
      expect(() => payloadGenerator(undefined as unknown as User)).toThrow('User is undefined or null');
    });

    it('should throw ResourceNotFoundError if user is null', () => {
      // This test ensures payloadGenerator throws ResourceNotFoundError when user is null.
      expect(() => payloadGenerator(null as unknown as User)).toThrow(ResourceNotFoundError);
      expect(() => payloadGenerator(null as unknown as User)).toThrow('User is undefined or null');
    });

    it('should handle user with empty username, email, and roles', () => {
      // This test ensures payloadGenerator works for a user with empty strings and empty roles.
      const mockUser = {
        username: '',
        email: '',
        id: 0,
        roles: [],
        getPermissionNames: jest.fn().mockReturnValue(['*:*']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result).toEqual({
        user: {
          username: '',
          email: '',
          id: 0,
          roles: [],
        },
        scopes: ['*:*'],
      });
      expect(jest.mocked(mockUser.getPermissionNames)).toHaveBeenCalled();
    });

    it('should handle user with id as a negative number', () => {
      // This test ensures payloadGenerator works for a user with a negative id.
      const mockRoles = [new Role('negative')];
      const mockUser = {
        username: 'neg_user',
        email: 'neg@example.com',
        id: -1,
        roles: mockRoles,
        getPermissionNames: jest.fn().mockReturnValue(['user:delete']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result.user.id).toBe(-1);
      expect(result.scopes).toEqual(['user:delete']);
    });

    it('should handle user with roles containing duplicate Role objects', () => {
      // This test ensures payloadGenerator works for a user with duplicate roles.
      const roleA = new Role('duplicate');
      const mockUser = {
        username: 'dup_user',
        email: 'dup@example.com',
        id: 999,
        roles: [roleA, roleA],
        getPermissionNames: jest.fn().mockReturnValue(['user:manage']) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result.user.roles).toEqual([roleA, roleA]);
      expect(result.scopes).toEqual(['user:manage']);
    });

    it('should handle user with getPermissionNames returning all possible permissions', () => {
      // This test ensures payloadGenerator works for a user with all possible permissions.
      const allPermissions = [
        'user:create', 'user:read', 'user:update', 'user:delete', 'user:manage', 'user:*',
        'auth:create', 'auth:read', 'auth:update', 'auth:delete', 'auth:manage', 'auth:*',
        'product:create', 'product:read', 'product:update', 'product:delete', 'product:manage', 'product:*',
        'order:create', 'order:read', 'order:update', 'order:delete', 'order:manage', 'order:*',
        'project:create', 'project:read', 'project:update', 'project:delete', 'project:manage', 'project:*',
        'invoice:create', 'invoice:read', 'invoice:update', 'invoice:delete', 'invoice:manage', 'invoice:*',
        'document:create', 'document:read', 'document:update', 'document:delete', 'document:manage', 'document:*',
        'system:create', 'system:read', 'system:update', 'system:delete', 'system:manage', 'system:*',
        '*:create', '*:read', '*:update', '*:delete', '*:manage', '*:*'
      ];
      const mockRoles = [new Role('superuser')];
      const mockUser = {
        username: 'super_user',
        email: 'super@example.com',
        id: 1000,
        roles: mockRoles,
        getPermissionNames: jest.fn().mockReturnValue(allPermissions) as any,
      } as unknown as jest.Mocked<User>;

      const result = payloadGenerator(mockUser);

      expect(result.scopes).toEqual(allPermissions);
      expect(jest.mocked(mockUser.getPermissionNames)).toHaveBeenCalled();
    });
  });
});