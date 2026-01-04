import { Action, Resource } from "../../../src/types/rbac.type";
import { isRBACPermission } from '../../../src/utils/isRBACPermission.util';

describe('isRBACPermission() isRBACPermission method', () => {
  // Happy paths
  describe('Happy paths', () => {
    it('should return true for a valid resource and valid action', () => {
      // Test a typical valid permission string
      expect(isRBACPermission(`${Resource.USER}:${Action.CREATE}`)).toBe(true);
    });

    it('should return true for a valid resource and wildcard action', () => {
      // Test with wildcard action
      expect(isRBACPermission(`${Resource.PRODUCT}:${Action.ALL}`)).toBe(true);
    });

    it('should return true for wildcard resource and valid action', () => {
      // Test with wildcard resource
      expect(isRBACPermission(`${Resource.ALL}:${Action.READ}`)).toBe(true);
    });

    it('should return true for wildcard resource and wildcard action', () => {
      // Test with both wildcards
      expect(isRBACPermission(`${Resource.ALL}:${Action.ALL}`)).toBe(true);
    });

    it('should return true for all valid resource-action combinations', () => {
      // Test all combinations of resources and actions
      Object.values(Resource).forEach((resource) => {
        Object.values(Action).forEach((action) => {
          expect(isRBACPermission(`${resource}:${action}`)).toBe(true);
        });
      });
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should return false for an invalid resource with a valid action', () => {
      // Test with a resource not in the enum
      expect(isRBACPermission(`invalidResource:${Action.CREATE}`)).toBe(false);
    });

    it('should return false for a valid resource with an invalid action', () => {
      // Test with an action not in the enum
      expect(isRBACPermission(`${Resource.USER}:invalidAction`)).toBe(false);
    });

    it('should return false for both invalid resource and action', () => {
      // Test with both parts invalid
      expect(isRBACPermission(`invalidResource:invalidAction`)).toBe(false);
    });

    it('should return false for missing colon separator', () => {
      // Test with no colon
      expect(isRBACPermission(`${Resource.USER}${Action.CREATE}`)).toBe(false);
    });

    it('should return false for empty string', () => {
      // Test with empty input
      expect(isRBACPermission('')).toBe(false);
    });

    it('should return false for string with only colon', () => {
      // Test with only colon
      expect(isRBACPermission(':')).toBe(false);
    });

    it('should return false for string with missing resource', () => {
      // Test with missing resource
      expect(isRBACPermission(`:${Action.CREATE}`)).toBe(false);
    });

    it('should return false for string with missing action', () => {
      // Test with missing action
      expect(isRBACPermission(`${Resource.USER}:`)).toBe(false);
    });

 
    it('should return false for resource and action with leading/trailing spaces', () => {
      // Test with spaces around resource and action
      expect(isRBACPermission(` ${Resource.USER} : ${Action.CREATE} `)).toBe(false);
    });

    it('should return false for resource and action with wrong case', () => {
      // Test with incorrect case
      expect(isRBACPermission(`${Resource.USER.toUpperCase()}:${Action.CREATE}`)).toBe(false);
      expect(isRBACPermission(`${Resource.USER}:${Action.CREATE.toUpperCase()}`)).toBe(false);
    });

    it('should return false for numeric resource and action', () => {
      // Test with numbers
      expect(isRBACPermission(`123:456`)).toBe(false);
    });

    it('should return false for special characters in resource and action', () => {
      // Test with special characters
      expect(isRBACPermission(`!@#:$%^`)).toBe(false);
    });
  });
});