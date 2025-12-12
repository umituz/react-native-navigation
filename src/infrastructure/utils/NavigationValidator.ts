/**
 * Navigation Validation Utilities
 * Provides input validation and sanitization for navigation
 */

import { NavigationConfigManager } from './NavigationConfigManager';

export class NavigationValidator {
  private static readonly ROUTE_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
  private static readonly SCRIPT_PATTERNS = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];
  private static readonly validationCache = new Map<string, boolean>();

  /**
   * Validate route name format
   */
  static isValidRouteName(routeName: string): boolean {
    if (!routeName || typeof routeName !== 'string') {
      return false;
    }

    // Skip validation if disabled
    if (!NavigationConfigManager.isValidationEnabled()) {
      return true;
    }

    // Check cache first if enabled
    if (NavigationConfigManager.isCacheEnabled() && NavigationValidator.validationCache.has(routeName)) {
      return NavigationValidator.validationCache.get(routeName)!;
    }

    // Validate and cache result
    const isValid = NavigationValidator.ROUTE_NAME_PATTERN.test(routeName);
    
    // Manage cache size if caching is enabled
    if (NavigationConfigManager.isCacheEnabled()) {
      const maxSize = NavigationConfigManager.getPerformanceConfig().maxCacheSize;
      if (NavigationValidator.validationCache.size >= maxSize) {
        const firstKey = NavigationValidator.validationCache.keys().next().value;
        if (firstKey) {
          NavigationValidator.validationCache.delete(firstKey);
        }
      }
      
      NavigationValidator.validationCache.set(routeName, isValid);
    }
    
    return isValid;
  }

  /**
   * Validate navigation parameters
   */
  static isValidParams(params: unknown): boolean {
    if (params === undefined || params === null) {
      return true;
    }
    
    if (typeof params !== 'object' || Array.isArray(params)) {
      return false;
    }

    // Check for potentially dangerous properties
    const paramKeys = Object.keys(params);
    for (const key of paramKeys) {
      // Check for prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return false;
      }
      
      // Check for script injection in string values
      const value = (params as any)[key];
      if (typeof value === 'string' && NavigationValidator.containsScript(value)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check for potential script injection
   */
  static containsScript(value: string): boolean {
    return NavigationValidator.SCRIPT_PATTERNS.some(pattern => pattern.test(value));
  }

  /**
   * Sanitize route name
   */
  static sanitizeRouteName(routeName: string): string {
    return routeName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  }

  /**
   * Validate stack name
   */
  static isValidStackName(stackName: string): boolean {
    return NavigationValidator.isValidRouteName(stackName);
  }

  /**
   * Validate screen name
   */
  static isValidScreenName(screenName: string): boolean {
    return NavigationValidator.isValidRouteName(screenName);
  }

  /**
   * Validate navigation input and throw error if invalid
   */
  static validateNavigationInput(
    routeName: string,
    params?: unknown,
    stackName?: string,
    screenName?: string
  ): void {
    if (!NavigationValidator.isValidRouteName(routeName)) {
      throw new Error(`Invalid route name: ${routeName}`);
    }

    if (params !== undefined && !NavigationValidator.isValidParams(params)) {
      throw new Error('Invalid navigation parameters: must be an object');
    }

    if (stackName && !NavigationValidator.isValidStackName(stackName)) {
      throw new Error(`Invalid stack name: ${stackName}`);
    }

    if (screenName && !NavigationValidator.isValidScreenName(screenName)) {
      throw new Error(`Invalid screen name: ${screenName}`);
    }
  }
}