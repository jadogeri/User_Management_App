import { RoleNamesEnum } from "../../../src/types/role-names.type";
import { isRoleName } from '../../../src/utils/isRoleName.util';

describe('isRoleName() isRoleName method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    it('should return true when item is RoleNamesEnum.ADMIN', () => {
      // Test that ADMIN is recognized as a valid role name
      expect(isRoleName(RoleNamesEnum.ADMIN)).toBe(true);
    });

    it('should return true when item is RoleNamesEnum.USER', () => {
      // Test that USER is recognized as a valid role name
      expect(isRoleName(RoleNamesEnum.USER)).toBe(true);
    });

    it('should return true when item is RoleNamesEnum.VIEWER', () => {
      // Test that VIEWER is recognized as a valid role name
      expect(isRoleName(RoleNamesEnum.VIEWER)).toBe(true);
    });

    it('should return true when item is RoleNamesEnum.EDITOR', () => {
      // Test that EDITOR is recognized as a valid role name
      expect(isRoleName(RoleNamesEnum.EDITOR)).toBe(true);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should return false when item is a string that matches a role name but with different case', () => {
      // Test that case sensitivity is enforced
      expect(isRoleName('admin')).toBe(false);
      expect(isRoleName('Admin')).toBe(false);
      expect(isRoleName('EDITOR ')).toBe(false);
    });

    it('should return false when item is a string that does not match any role name', () => {
      // Test with a completely invalid string
      expect(isRoleName('MANAGER')).toBe(false);
      expect(isRoleName('')).toBe(false);
      expect(isRoleName('123')).toBe(false);
    });

    it('should return false when item is a number', () => {
      // Test with a number input
      expect(isRoleName(0)).toBe(false);
      expect(isRoleName(1)).toBe(false);
      expect(isRoleName(123)).toBe(false);
    });

    it('should return false when item is a boolean', () => {
      // Test with boolean values
      expect(isRoleName(true)).toBe(false);
      expect(isRoleName(false)).toBe(false);
    });

    it('should return false when item is an object', () => {
      // Test with an object input
      expect(isRoleName({})).toBe(false);
      expect(isRoleName({ role: 'ADMIN' })).toBe(false);
    });

    it('should return false when item is an array', () => {
      // Test with an array input
      expect(isRoleName([])).toBe(false);
      expect(isRoleName(['ADMIN'])).toBe(false);
    });

    it('should return false when item is a symbol', () => {
      // Test with a symbol input
      expect(isRoleName(Symbol('ADMIN'))).toBe(false);
    });

    it('should return false when item is a function', () => {
      // Test with a function input
      expect(isRoleName(() => 'ADMIN')).toBe(false);
    });
  });
});