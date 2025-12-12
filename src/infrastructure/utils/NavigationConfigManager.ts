/**
 * Navigation Configuration Manager
 * Manages dynamic navigation configuration for generic usage
 */

import type { NavigationConfig, NavigationRouteConfig } from '../types/NavigationConfig';

export class NavigationConfigManager {
  private static config: NavigationConfig = {};
  private static performanceConfig = {
    enableCache: true,
    maxCacheSize: 100,
    enableValidation: true,
    enableDevLogs: __DEV__,
  };

  /**
   * Set navigation configuration
   */
  static setConfig(config: NavigationConfig): void {
    NavigationConfigManager.config = { ...config };
    
    if (__DEV__) {
      console.info('Navigation configuration updated:', config);
    }
  }

  /**
   * Get current navigation configuration
   */
  static getConfig(): NavigationConfig {
    return NavigationConfigManager.config;
  }

  /**
   * Get specific route configuration
   */
  static getRouteConfig(routeKey: string): NavigationRouteConfig | undefined {
    return NavigationConfigManager.config.routes?.[routeKey];
  }

  /**
   * Get default route name by type
   */
  static getDefaultRoute(routeType: 'home' | 'settings' | 'main'): string | undefined {
    return NavigationConfigManager.config.defaultRoutes?.[routeType];
  }

  /**
   * Set performance configuration
   */
  static setPerformanceConfig(config: Partial<typeof NavigationConfigManager.performanceConfig>): void {
    NavigationConfigManager.performanceConfig = {
      ...NavigationConfigManager.performanceConfig,
      ...config,
    };
  }

  /**
   * Get performance configuration
   */
  static getPerformanceConfig() {
    return NavigationConfigManager.performanceConfig;
  }

  /**
   * Check if caching is enabled
   */
  static isCacheEnabled(): boolean {
    return NavigationConfigManager.performanceConfig.enableCache;
  }

  /**
   * Check if validation is enabled
   */
  static isValidationEnabled(): boolean {
    return NavigationConfigManager.performanceConfig.enableValidation;
  }

  /**
   * Check if dev logs are enabled
   */
  static isDevLogsEnabled(): boolean {
    return NavigationConfigManager.performanceConfig.enableDevLogs;
  }

  /**
   * Reset configuration to defaults
   */
  static reset(): void {
    NavigationConfigManager.config = {};
    NavigationConfigManager.performanceConfig = {
      enableCache: true,
      maxCacheSize: 100,
      enableValidation: true,
      enableDevLogs: __DEV__,
    };
    
    if (__DEV__) {
      console.info('Navigation configuration reset to defaults');
    }
  }
}