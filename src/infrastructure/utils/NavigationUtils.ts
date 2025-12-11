/**
 * Navigation Utilities
 * Provides utility functions for navigation state and helpers
 */

import { NavigationRefManager } from './NavigationRefManager';

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
    if (!ref) return undefined;

    const currentRoute = ref.getCurrentRoute();
    return currentRoute?.name;
  }

  /**
   * Check if current route matches given route name
   */
  static isCurrentRoute(routeName: string): boolean {
    return NavigationUtils.getCurrentRouteName() === routeName;
  }

  /**
   * Go back with fallback route
   */
  static backWithFallback(fallbackRoute: string, fallbackParams?: object): void {
    if (NavigationUtils.canGoBack()) {
      const { NavigationActions } = require('./NavigationActions');
      NavigationActions.goBack();
    } else {
      const { NavigationActions } = require('./NavigationActions');
      NavigationActions.navigate(fallbackRoute, fallbackParams);
    }
  }
}