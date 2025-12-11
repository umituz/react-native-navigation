/**
 * Navigation Ref Manager Tests
 */

import { NavigationRefManager } from '../infrastructure/utils/NavigationRefManager';

// Mock navigation ref
const mockNavigationRef = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  canGoBack: jest.fn(() => true),
  dispatch: jest.fn(),
  getCurrentRoute: jest.fn(() => ({ name: 'Home' })),
  getParent: jest.fn(() => null),
  isReady: jest.fn(() => true),
};

describe('NavigationRefManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NavigationRefManager.cleanup();
  });

  describe('setNavigationRef', () => {
    it('should set navigation reference', () => {
      NavigationRefManager.setNavigationRef(mockNavigationRef as any);
      expect(NavigationRefManager.getNavigationRef()).toBe(mockNavigationRef);
    });

    it('should clear navigation reference when null is passed', () => {
      NavigationRefManager.setNavigationRef(mockNavigationRef as any);
      NavigationRefManager.setNavigationRef(null);
      expect(NavigationRefManager.getNavigationRef()).toBeNull();
    });
  });

  describe('isNavigationReady', () => {
    it('should return true when navigation ref is set', () => {
      NavigationRefManager.setNavigationRef(mockNavigationRef as any);
      expect(NavigationRefManager.isNavigationReady()).toBe(true);
    });

    it('should return false when navigation ref is not set', () => {
      expect(NavigationRefManager.isNavigationReady()).toBe(false);
    });
  });

  describe('executeNavigationAction', () => {
    beforeEach(() => {
      NavigationRefManager.setNavigationRef(mockNavigationRef as any);
    });

    it('should execute action when navigation is ready', () => {
      const mockAction = jest.fn();
      NavigationRefManager.executeNavigationAction(mockAction);
      expect(mockAction).toHaveBeenCalled();
    });

    it('should not execute action when navigation is not ready', () => {
      NavigationRefManager.setNavigationRef(null);
      const mockAction = jest.fn();
      NavigationRefManager.executeNavigationAction(mockAction);
      expect(mockAction).not.toHaveBeenCalled();
    });

    it('should handle action errors gracefully', () => {
      const mockAction = jest.fn(() => {
        throw new Error('Test error');
      });
      expect(() => {
        NavigationRefManager.executeNavigationAction(mockAction);
      }).not.toThrow();
    });
  });

  describe('cleanup', () => {
    it('should clear navigation reference', () => {
      NavigationRefManager.setNavigationRef(mockNavigationRef as any);
      NavigationRefManager.cleanup();
      expect(NavigationRefManager.getNavigationRef()).toBeNull();
    });
  });
});