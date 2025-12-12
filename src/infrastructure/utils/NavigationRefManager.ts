/**
 * Navigation Reference Manager
 * Manages the navigation reference for the entire application
 */

import type { NavigationContainerRef } from '@react-navigation/native';
import { NavigationConfigManager } from './NavigationConfigManager';

export class NavigationRefManager {
  private static navigationRef: NavigationContainerRef | null = null;
  private static cleanupCallbacks: Array<() => void> = [];

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
        if (NavigationConfigManager.isDevLogsEnabled()) {
          console.warn('Navigation action failed:', error);
        }
      }
    } else if (NavigationConfigManager.isDevLogsEnabled()) {
      console.warn('Navigation reference is not available');
    }
  }

  /**
   * Add cleanup callback to be called during cleanup
   */
  static addCleanupCallback(callback: () => void): void {
    NavigationRefManager.cleanupCallbacks.push(callback);
  }

  /**
   * Remove cleanup callback
   */
  static removeCleanupCallback(callback: () => void): void {
    const index = NavigationRefManager.cleanupCallbacks.indexOf(callback);
    if (index > -1) {
      NavigationRefManager.cleanupCallbacks.splice(index, 1);
    }
  }

  /**
   * Clean up navigation reference to prevent memory leaks
   */
  static cleanup(): void {
    // Execute all cleanup callbacks
    NavigationRefManager.cleanupCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        if (NavigationConfigManager.isDevLogsEnabled()) {
          console.warn('Cleanup callback failed:', error);
        }
      }
    });
    
    // Clear callbacks array
    NavigationRefManager.cleanupCallbacks = [];
    
    // Clear navigation reference
    NavigationRefManager.navigationRef = null;
    
    if (NavigationConfigManager.isDevLogsEnabled()) {
      console.info('Navigation reference cleaned up');
    }
  }
}