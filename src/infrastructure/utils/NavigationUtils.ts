/**
 * Navigation Utilities
 * Provides utility functions for navigation state and helpers
 */

import { NavigationRefManager } from './NavigationRefManager';
import { NavigationActions } from './NavigationActions';
import { NavigationConfigManager } from './NavigationConfigManager';

export class NavigationUtils {
  /**
   * Check if navigation can go back
   */
  static canGoBack(): boolean {
    const ref = NavigationRefManager.getNavigationRef();
    return ref ? ref.canGoBack() : false;
  }

  /**
   * Get current route name
   */
  static getCurrentRouteName(): string | undefined {
    const ref = NavigationRefManager.getNavigationRef();
    return ref?.getCurrentRoute()?.name;
  }

  /**
   * Check if current route matches given route name
   */
  static isCurrentRoute(routeName: string): boolean {
    return NavigationUtils.getCurrentRouteName() === routeName;
  }

  /**
   * Go back with fallback route
   * @returns true if navigation was successful, false otherwise
   */
  static backWithFallback(fallbackRoute: string, fallbackParams?: object): boolean {
    try {
      if (NavigationUtils.canGoBack()) {
        return NavigationActions.goBack();
      } else {
        return NavigationActions.navigate(fallbackRoute, fallbackParams);
      }
    } catch (error) {
      if (NavigationConfigManager.isDevLogsEnabled()) {
        console.error('Navigation failed in backWithFallback:', error);
      }
      // Fallback to direct navigation
      return NavigationActions.navigate(fallbackRoute, fallbackParams);
    }
  }
}