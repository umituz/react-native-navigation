/**
 * Navigation Validator Tests
 */

import { NavigationValidator } from '../infrastructure/utils/NavigationValidator';

describe('NavigationValidator', () => {
  describe('isValidRouteName', () => {
    it('should accept valid route names', () => {
      expect(NavigationValidator.isValidRouteName('Home')).toBe(true);
      expect(NavigationValidator.isValidRouteName('user_profile')).toBe(true);
      expect(NavigationValidator.isValidRouteName('settings-page')).toBe(true);
      expect(NavigationValidator.isValidRouteName('Screen123')).toBe(true);
    });

    it('should reject invalid route names', () => {
      expect(NavigationValidator.isValidRouteName('')).toBe(false);
      expect(NavigationValidator.isValidRouteName('invalid route')).toBe(false);
      expect(NavigationValidator.isValidRouteName('route@name')).toBe(false);
      expect(NavigationValidator.isValidRouteName('route/name')).toBe(false);
      expect(NavigationValidator.isValidRouteName(null as any)).toBe(false);
      expect(NavigationValidator.isValidRouteName(undefined as any)).toBe(false);
    });
  });

  describe('isValidParams', () => {
    it('should accept valid parameters', () => {
      expect(NavigationValidator.isValidParams(undefined)).toBe(true);
      expect(NavigationValidator.isValidParams(null)).toBe(true);
      expect(NavigationValidator.isValidParams({})).toBe(true);
      expect(NavigationValidator.isValidParams({ id: 1 })).toBe(true);
    });

    it('should reject invalid parameters', () => {
      expect(NavigationValidator.isValidParams([])).toBe(false);
      expect(NavigationValidator.isValidParams('string')).toBe(false);
      expect(NavigationValidator.isValidParams(123)).toBe(false);
      expect(NavigationValidator.isValidParams(true)).toBe(false);
    });
  });

  describe('sanitizeRouteName', () => {
    it('should sanitize route names', () => {
      expect(NavigationValidator.sanitizeRouteName('valid-route')).toBe('valid-route');
      expect(NavigationValidator.sanitizeRouteName('invalid route')).toBe('invalidroute');
      expect(NavigationValidator.sanitizeRouteName('route@name')).toBe('routename');
      expect(NavigationValidator.sanitizeRouteName('  route  ')).toBe('route');
    });
  });

  describe('validateNavigationInput', () => {
    it('should validate correct input', () => {
      expect(() => {
        NavigationValidator.validateNavigationInput('Home', { id: 1 });
      }).not.toThrow();
    });

    it('should throw on invalid route name', () => {
      expect(() => {
        NavigationValidator.validateNavigationInput('invalid route');
      }).toThrow('Invalid route name');
    });

    it('should throw on invalid parameters', () => {
      expect(() => {
        NavigationValidator.validateNavigationInput('Home', []);
      }).toThrow('Invalid navigation parameters');
    });
  });
});