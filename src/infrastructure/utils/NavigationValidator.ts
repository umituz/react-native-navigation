/**
 * Navigation Validation Utilities
 * Provides input validation and sanitization for navigation
 */

export class NavigationValidator {
  /**
   * Validate route name format
   */
  static isValidRouteName(routeName: string): boolean {
    if (!routeName || typeof routeName !== 'string') {
      return false;
    }
    // Allow alphanumeric, underscore, and hyphen
    return /^[a-zA-Z0-9_-]+$/.test(routeName);
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
    const scriptPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
    ];
    
    return scriptPatterns.some(pattern => pattern.test(value));
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