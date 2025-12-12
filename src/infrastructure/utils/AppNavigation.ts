/**
 * AppNavigation Utility
 *
 * Centralized navigation helper functions for React Native apps
 * Provides type-safe navigation methods and utilities
 */

import type { NavigationContainerRef } from '@react-navigation/native';
import { NavigationRefManager } from './NavigationRefManager';
import { NavigationActions } from './NavigationActions';
import { NavigationUtils } from './NavigationUtils';
import { NavigationConfigManager } from './NavigationConfigManager';

/**
 * Navigation helper functions for centralized routing
 */
export class AppNavigation {
  /**
   * Set navigation reference
   */
  static setNavigationRef(ref: NavigationContainerRef | null): void {
    NavigationRefManager.setNavigationRef(ref);
  }

  /**
   * Get current navigation reference
   */
  static getNavigationRef(): NavigationContainerRef | null {
    return NavigationRefManager.getNavigationRef();
  }

  /**
   * Navigate to screen within current navigator
   * @returns true if navigation was successful, false otherwise
   */
  static navigate(routeName: string, params?: object): boolean {
    return NavigationActions.navigate(routeName, params);
  }

  /**
   * Navigate to configured route
   * @returns true if navigation was successful, false otherwise
   */
  static navigateToConfiguredRoute(routeKey: string): boolean {
    const routeConfig = NavigationConfigManager.getRouteConfig(routeKey);
    if (!routeConfig) {
      if (__DEV__) {
        console.warn(`Route configuration not found for key: ${routeKey}`);
      }
      return false;
    }
    
    return NavigationActions.navigate(routeConfig.name, routeConfig.params);
  }

  /**
   * Navigate to default home route
   * @returns true if navigation was successful, false otherwise
   */
  static goToHome(): boolean {
    const homeRoute = NavigationConfigManager.getDefaultRoute('home');
    if (homeRoute) {
      return NavigationActions.navigate(homeRoute);
    }
    
    if (__DEV__) {
      console.warn('Home route not configured');
    }
    return false;
  }

  /**
   * Navigate to default settings route
   * @returns true if navigation was successful, false otherwise
   */
  static goToSettings(): boolean {
    const settingsRoute = NavigationConfigManager.getDefaultRoute('settings');
    if (settingsRoute) {
      return NavigationActions.navigate(settingsRoute);
    }
    
    if (__DEV__) {
      console.warn('Settings route not configured');
    }
    return false;
  }

  /**
   * Navigate to default main route
   * @returns true if navigation was successful, false otherwise
   */
  static goToMain(): boolean {
    const mainRoute = NavigationConfigManager.getDefaultRoute('main');
    if (mainRoute) {
      return NavigationActions.navigate(mainRoute);
    }
    
    if (__DEV__) {
      console.warn('Main route not configured');
    }
    return false;
  }

  /**
   * Navigate to screen in parent navigator
   * @returns true if navigation was successful, false otherwise
   */
  static navigateToParent(routeName: string, params?: object): boolean {
    return NavigationActions.navigateToParent(routeName, params);
  }

  /**
   * Navigate to specific screen in specific stack
   * @returns true if navigation was successful, false otherwise
   */
  static navigateToStack(stackName: string, screenName: string, params?: object): boolean {
    return NavigationActions.navigateToStack(stackName, screenName, params);
  }

  /**
   * Push new screen onto stack
   * @returns true if navigation was successful, false otherwise
   */
  static push(routeName: string, params?: object): boolean {
    return NavigationActions.push(routeName, params);
  }

  /**
   * Go back to previous screen
   * @returns true if navigation was successful, false otherwise
   */
  static goBack(): boolean {
    return NavigationActions.goBack();
  }

  /**
   * Reset navigation stack to specific route
   * @returns true if navigation was successful, false otherwise
   */
  static reset(routeName: string, params?: object): boolean {
    return NavigationActions.reset(routeName, params);
  }

  /**
   * Replace current screen
   * @returns true if navigation was successful, false otherwise
   */
  static replace(routeName: string, params?: object): boolean {
    return NavigationActions.replace(routeName, params);
  }

  /**
   * Check if navigation can go back
   */
  static canGoBack(): boolean {
    return NavigationUtils.canGoBack();
  }

  /**
   * Get current route name
   */
  static getCurrentRouteName(): string | undefined {
    return NavigationUtils.getCurrentRouteName();
  }

  /**
   * Check if current route matches given route name
   */
  static isCurrentRoute(routeName: string): boolean {
    return NavigationUtils.isCurrentRoute(routeName);
  }

  /**
   * Go back with fallback route
   * @returns true if navigation was successful, false otherwise
   */
  static backWithFallback(fallbackRoute: string, fallbackParams?: object): boolean {
    return NavigationUtils.backWithFallback(fallbackRoute, fallbackParams);
  }


}