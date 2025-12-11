/**
 * Navigation Reference Manager
 * Manages the navigation reference for the entire application
 */

import type { NavigationContainerRef } from '@react-navigation/native';

export class NavigationRefManager {
  private static navigationRef: NavigationContainerRef | null = null;

  /**
   * Set navigation reference
   */
  static setNavigationRef(ref: NavigationContainerRef | null): void {
    NavigationRefManager.navigationRef = ref;
  }

  /**
   * Get current navigation reference
   */
  static getNavigationRef(): NavigationContainerRef | null {
    return NavigationRefManager.navigationRef;
  }

  /**
   * Check if navigation reference is available
   */
  static isNavigationReady(): boolean {
    return NavigationRefManager.navigationRef !== null;
  }

  /**
   * Execute navigation action safely
   */
  static executeNavigationAction(action: () => void): void {
    if (NavigationRefManager.navigationRef) {
      try {
        action();
      } catch (error) {
        if (__DEV__) {
          console.warn('Navigation action failed:', error);
        }
      }
    } else if (__DEV__) {
      console.warn('Navigation reference is not available');
    }
  }
}