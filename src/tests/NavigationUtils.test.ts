/**
 * Navigation Utils Tests
 */

import { NavigationUtils } from '../infrastructure/utils/NavigationUtils';
import { NavigationRefManager } from '../infrastructure/utils/NavigationRefManager';
import { NavigationConfigManager } from '../infrastructure/utils/NavigationConfigManager';

// Mock navigation ref
const mockNavigationRef = {
  navigate: jest.fn(),
  goBack: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  dispatch: jest.fn(),
  getCurrentRoute: jest.fn(() => ({ name: 'Home' })),
  getParent: jest.fn(() => null),
  isReady: jest.fn(() => true),
};

describe('NavigationUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NavigationRefManager.cleanup();
    NavigationConfigManager.reset();
    NavigationRefManager.setNavigationRef(mockNavigationRef as any);
  });

  describe('canGoBack', () => {
    it('should return true when navigation can go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      
      const result = NavigationUtils.canGoBack();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.canGoBack).toHaveBeenCalled();
    });

    it('should return false when navigation cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);
      
      const result = NavigationUtils.canGoBack();
      
      expect(result).toBe(false);
    });

    it('should return false when navigation ref is null', () => {
      NavigationRefManager.setNavigationRef(null);
      
      const result = NavigationUtils.canGoBack();
      
      expect(result).toBe(false);
      expect(mockNavigationRef.canGoBack).not.toHaveBeenCalled();
    });
  });

  describe('getCurrentRouteName', () => {
    it('should return current route name', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue({ name: 'CurrentScreen' });
      
      const result = NavigationUtils.getCurrentRouteName();
      
      expect(result).toBe('CurrentScreen');
      expect(mockNavigationRef.getCurrentRoute).toHaveBeenCalled();
    });

    it('should return undefined when no current route', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(undefined);
      
      const result = NavigationUtils.getCurrentRouteName();
      
      expect(result).toBeUndefined();
    });

    it('should return undefined when navigation ref is null', () => {
      NavigationRefManager.setNavigationRef(null);
      
      const result = NavigationUtils.getCurrentRouteName();
      
      expect(result).toBeUndefined();
      expect(mockNavigationRef.getCurrentRoute).not.toHaveBeenCalled();
    });
  });

  describe('isCurrentRoute', () => {
    it('should return true when current route matches', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue({ name: 'HomeScreen' });
      
      const result = NavigationUtils.isCurrentRoute('HomeScreen');
      
      expect(result).toBe(true);
    });

    it('should return false when current route does not match', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue({ name: 'HomeScreen' });
      
      const result = NavigationUtils.isCurrentRoute('SettingsScreen');
      
      expect(result).toBe(false);
    });

    it('should return false when no current route', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(undefined);
      
      const result = NavigationUtils.isCurrentRoute('HomeScreen');
      
      expect(result).toBe(false);
    });
  });

  describe('backWithFallback', () => {
    it('should go back when possible', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      
      const result = NavigationUtils.backWithFallback('FallbackScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.canGoBack).toHaveBeenCalled();
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to fallback when cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);
      
      const result = NavigationUtils.backWithFallback('FallbackScreen', { param: 'value' });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.canGoBack).toHaveBeenCalled();
      expect(mockNavigationRef.goBack).not.toHaveBeenCalled();
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('FallbackScreen', { param: 'value' });
    });

    it('should navigate to fallback when goBack throws error', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      mockNavigationRef.goBack.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      const result = NavigationUtils.backWithFallback('FallbackScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('FallbackScreen', undefined);
    });

    it('should return false when navigation ref is null', () => {
      NavigationRefManager.setNavigationRef(null);
      
      const result = NavigationUtils.backWithFallback('FallbackScreen');
      
      expect(result).toBe(false);
      expect(mockNavigationRef.canGoBack).not.toHaveBeenCalled();
    });
  });
});