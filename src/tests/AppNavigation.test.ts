/**
 * App Navigation Tests
 */

import { AppNavigation } from '../infrastructure/utils/AppNavigation';
import { NavigationRefManager } from '../infrastructure/utils/NavigationRefManager';
import { NavigationConfigManager } from '../infrastructure/utils/NavigationConfigManager';

// Mock navigation ref
const mockNavigationRef = {
  navigate: jest.fn(),
  push: jest.fn(),
  goBack: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  dispatch: jest.fn(),
  getCurrentRoute: jest.fn(() => ({ name: 'Home' })),
  getParent: jest.fn(() => null),
  isReady: jest.fn(() => true),
};

describe('AppNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NavigationRefManager.cleanup();
    NavigationConfigManager.reset();
    NavigationRefManager.setNavigationRef(mockNavigationRef as any);
  });

  describe('navigation reference management', () => {
    it('should set and get navigation reference', () => {
      AppNavigation.setNavigationRef(mockNavigationRef as any);
      expect(AppNavigation.getNavigationRef()).toBe(mockNavigationRef);
    });

    it('should clear navigation reference', () => {
      AppNavigation.setNavigationRef(mockNavigationRef as any);
      AppNavigation.setNavigationRef(null);
      expect(AppNavigation.getNavigationRef()).toBeNull();
    });
  });

  describe('basic navigation', () => {
    it('should navigate to route', () => {
      const result = AppNavigation.navigate('TestScreen', { param: 'value' });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('TestScreen', { param: 'value' });
    });

    it('should navigate to parent', () => {
      const result = AppNavigation.navigateToParent('ParentScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('ParentScreen', undefined);
    });

    it('should navigate to stack', () => {
      const result = AppNavigation.navigateToStack('AuthStack', 'LoginScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('AuthStack', {
        screen: 'LoginScreen',
        params: undefined,
      });
    });

    it('should push to stack', () => {
      const result = AppNavigation.push('DetailScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.push).toHaveBeenCalledWith('DetailScreen', undefined);
    });

    it('should go back', () => {
      const result = AppNavigation.goBack();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
    });

    it('should reset navigation', () => {
      const result = AppNavigation.reset('HomeScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.dispatch).toHaveBeenCalled();
    });

    it('should replace screen', () => {
      const result = AppNavigation.replace('NewScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.dispatch).toHaveBeenCalled();
    });
  });

  describe('configured navigation', () => {
    beforeEach(() => {
      NavigationConfigManager.setConfig({
        routes: {
          userProfile: { name: 'ProfileScreen', params: { userId: 123 } },
          settings: { name: 'SettingsScreen' },
        },
        defaultRoutes: {
          home: 'HomeScreen',
          settings: 'SettingsScreen',
          main: 'MainScreen',
        },
      });
    });

    it('should navigate to configured route', () => {
      const result = AppNavigation.navigateToConfiguredRoute('userProfile');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('ProfileScreen', { userId: 123 });
    });

    it('should return false for non-configured route', () => {
      const result = AppNavigation.navigateToConfiguredRoute('nonexistent');
      
      expect(result).toBe(false);
      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to configured home route', () => {
      const result = AppNavigation.goToHome();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('HomeScreen', undefined);
    });

    it('should navigate to configured settings route', () => {
      const result = AppNavigation.goToSettings();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('SettingsScreen', undefined);
    });

    it('should navigate to configured main route', () => {
      const result = AppNavigation.goToMain();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('MainScreen', undefined);
    });
  });

  describe('navigation utilities', () => {
    it('should check if can go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      expect(AppNavigation.canGoBack()).toBe(true);
      
      mockNavigationRef.canGoBack.mockReturnValue(false);
      expect(AppNavigation.canGoBack()).toBe(false);
    });

    it('should get current route name', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue({ name: 'CurrentScreen' });
      expect(AppNavigation.getCurrentRouteName()).toBe('CurrentScreen');
    });

    it('should check if current route matches', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue({ name: 'HomeScreen' });
      
      expect(AppNavigation.isCurrentRoute('HomeScreen')).toBe(true);
      expect(AppNavigation.isCurrentRoute('OtherScreen')).toBe(false);
    });

    it('should go back with fallback', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      
      const result = AppNavigation.backWithFallback('FallbackScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
    });

    it('should navigate to fallback when cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);
      
      const result = AppNavigation.backWithFallback('FallbackScreen', { param: 'value' });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('FallbackScreen', { param: 'value' });
    });
  });

  describe('default routes without configuration', () => {
    it('should return false for home when not configured', () => {
      const result = AppNavigation.goToHome();
      expect(result).toBe(false);
    });

    it('should return false for settings when not configured', () => {
      const result = AppNavigation.goToSettings();
      expect(result).toBe(false);
    });

    it('should return false for main when not configured', () => {
      const result = AppNavigation.goToMain();
      expect(result).toBe(false);
    });
  });
});