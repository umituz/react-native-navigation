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
   */
  static navigate(routeName: string, params?: object): void {
    NavigationActions.navigate(routeName, params);
  }

  /**
   * Navigate to screen in parent navigator
   */
  static navigateToParent(routeName: string, params?: object): void {
    NavigationActions.navigateToParent(routeName, params);
  }

  /**
   * Navigate to specific screen in specific stack
   */
  static navigateToStack(stackName: string, screenName: string, params?: object): void {
    NavigationActions.navigateToStack(stackName, screenName, params);
  }

  /**
   * Push new screen onto stack
   */
  static push(routeName: string, params?: object): void {
    NavigationActions.push(routeName, params);
  }

  /**
   * Go back to previous screen
   */
  static goBack(): void {
    NavigationActions.goBack();
  }

  /**
   * Reset navigation stack to specific route
   */
  static reset(routeName: string, params?: object): void {
    NavigationActions.reset(routeName, params);
  }

  /**
   * Replace current screen
   */
  static replace(routeName: string, params?: object): void {
    NavigationActions.replace(routeName, params);
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
   */
  static backWithFallback(fallbackRoute: string, fallbackParams?: object): void {
    NavigationUtils.backWithFallback(fallbackRoute, fallbackParams);
  }

  /**
   * Navigate to Home Screen
   */
  static goToHome(): void {
    NavigationActions.navigate('Home');
  }

  /**
   * Navigate to Settings Screen
   */
  static goToSettings(): void {
    NavigationActions.navigate('Settings');
  }

  /**
   * Navigate to Main App
   */
  static goToMain(): void {
    NavigationActions.navigate('Main');
  }
}