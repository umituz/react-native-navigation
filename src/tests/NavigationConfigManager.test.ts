/**
 * Navigation Config Manager Tests
 */

import { NavigationConfigManager } from '../infrastructure/utils/NavigationConfigManager';

describe('NavigationConfigManager', () => {
  beforeEach(() => {
    NavigationConfigManager.reset();
  });

  describe('setConfig and getConfig', () => {
    it('should set and get configuration', () => {
      const config = {
        routes: {
          home: { name: 'HomeScreen' },
          profile: { name: 'ProfileScreen', params: { userId: 123 } },
        },
        defaultRoutes: {
          home: 'HomeScreen',
          settings: 'SettingsScreen',
        },
      };

      NavigationConfigManager.setConfig(config);
      expect(NavigationConfigManager.getConfig()).toEqual(config);
    });

    it('should merge configuration when called multiple times', () => {
      const config1 = {
        routes: { home: { name: 'HomeScreen' } },
      };
      const config2 = {
        routes: { profile: { name: 'ProfileScreen' } },
      };

      NavigationConfigManager.setConfig(config1);
      NavigationConfigManager.setConfig(config2);
      
      const result = NavigationConfigManager.getConfig();
      expect(result.routes).toEqual(config2.routes);
    });
  });

  describe('getRouteConfig', () => {
    it('should return route configuration for existing key', () => {
      const config = {
        routes: {
          home: { name: 'HomeScreen', params: { test: true } },
        },
      };

      NavigationConfigManager.setConfig(config);
      const routeConfig = NavigationConfigManager.getRouteConfig('home');
      
      expect(routeConfig).toEqual({ name: 'HomeScreen', params: { test: true } });
    });

    it('should return undefined for non-existing key', () => {
      const routeConfig = NavigationConfigManager.getRouteConfig('nonexistent');
      expect(routeConfig).toBeUndefined();
    });
  });

  describe('getDefaultRoute', () => {
    it('should return default route name for existing type', () => {
      const config = {
        defaultRoutes: {
          home: 'HomeScreen',
          settings: 'SettingsScreen',
        },
      };

      NavigationConfigManager.setConfig(config);
      
      expect(NavigationConfigManager.getDefaultRoute('home')).toBe('HomeScreen');
      expect(NavigationConfigManager.getDefaultRoute('settings')).toBe('SettingsScreen');
    });

    it('should return undefined for non-existing default route', () => {
      expect(NavigationConfigManager.getDefaultRoute('home')).toBeUndefined();
    });
  });

  describe('performance configuration', () => {
    it('should set and get performance configuration', () => {
      const perfConfig = {
        enableCache: false,
        maxCacheSize: 200,
        enableValidation: false,
        enableDevLogs: false,
      };

      NavigationConfigManager.setPerformanceConfig(perfConfig);
      expect(NavigationConfigManager.getPerformanceConfig()).toEqual(
        expect.objectContaining(perfConfig)
      );
    });

    it('should merge performance configuration', () => {
      NavigationConfigManager.setPerformanceConfig({ enableCache: false });
      NavigationConfigManager.setPerformanceConfig({ maxCacheSize: 300 });
      
      const config = NavigationConfigManager.getPerformanceConfig();
      expect(config.enableCache).toBe(false);
      expect(config.maxCacheSize).toBe(300);
      expect(config.enableValidation).toBe(true); // default value
    });

    it('should return correct boolean values', () => {
      NavigationConfigManager.setPerformanceConfig({
        enableCache: false,
        enableValidation: false,
        enableDevLogs: false,
      });

      expect(NavigationConfigManager.isCacheEnabled()).toBe(false);
      expect(NavigationConfigManager.isValidationEnabled()).toBe(false);
      expect(NavigationConfigManager.isDevLogsEnabled()).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset configuration to defaults', () => {
      NavigationConfigManager.setConfig({
        routes: { test: { name: 'Test' } },
      });
      NavigationConfigManager.setPerformanceConfig({ enableCache: false });

      NavigationConfigManager.reset();

      expect(NavigationConfigManager.getConfig()).toEqual({});
      expect(NavigationConfigManager.isCacheEnabled()).toBe(true);
      expect(NavigationConfigManager.isValidationEnabled()).toBe(true);
    });
  });
});