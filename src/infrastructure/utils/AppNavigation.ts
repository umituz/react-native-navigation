/**
 * AppNavigation Utility
 *
 * Centralized navigation helper functions for React Native apps
 * Provides type-safe navigation methods and predefined app flow routes
 */

import { CommonActions, StackActions } from '@react-navigation/native';

// Navigation reference type
type NavigationRef = any;

/**
 * Navigation helper functions for centralized routing
 */
export class AppNavigation {
  private static navigationRef: NavigationRef = null;

  /**
   * Set navigation reference
   */
  static setNavigationRef(ref: NavigationRef) {
    AppNavigation.navigationRef = ref;
  }

  /**
   * Get current navigation reference
   */
  static getNavigationRef(): NavigationRef {
    return AppNavigation.navigationRef;
  }

  /**
   * Navigate to screen within current navigator
   * @param routeName - Screen name to navigate to
   * @param params - Optional navigation parameters
   */
  static navigate(routeName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        AppNavigation.navigationRef.navigate(routeName, params);
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Navigate to screen in parent navigator (for modal/stack navigation)
   * Use this when navigating from tab screens to modal screens
   * @param routeName - Screen name in parent navigator
   * @param params - Optional navigation parameters
   */
  static navigateToParent(routeName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        const parent = AppNavigation.navigationRef.getParent();
        if (parent) {
          (parent as any).navigate(routeName, params);
        } else {
          // Fallback: Try navigating directly if no parent found
          AppNavigation.navigationRef.navigate(routeName, params);
        }
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Navigate to specific screen in specific stack
   * @param stackName - Name of the stack navigator (e.g., 'Main', 'RootStack')
   * @param screenName - Name of the screen within that stack
   * @param params - Optional navigation parameters
   */
  static navigateToStack(stackName: string, screenName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        AppNavigation.navigationRef.navigate(stackName, {
          screen: screenName,
          params,
        });
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Push new screen onto stack
   */
  static push(routeName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        AppNavigation.navigationRef.push(routeName, params);
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Go back to previous screen
   */
  static goBack() {
    if (AppNavigation.navigationRef && AppNavigation.navigationRef.canGoBack()) {
      try {
        AppNavigation.navigationRef.goBack();
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Reset navigation stack to specific route
   */
  static reset(routeName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        AppNavigation.navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params }],
          })
        );
      } catch (error) {
        // Silent failure
      }
    }
  }

  /**
   * Replace current screen
   */
  static replace(routeName: string, params?: object) {
    if (AppNavigation.navigationRef) {
      try {
        AppNavigation.navigationRef.dispatch(
          StackActions.replace(routeName, params)
        );
      } catch (error) {
        // Silent failure
      }
    }
  }

  // ============================================================================
  // PREDEFINED ROUTES - App Flow Navigation
  // ============================================================================

  /**
   * Navigate to Splash Screen (app initialization)
   */
  static goToSplash() {
    AppNavigation.reset('Splash');
  }

  /**
   * Navigate to Onboarding Screen (first-time users)
   */
  static goToOnboarding() {
    AppNavigation.reset('Onboarding');
  }

  /**
   * Navigate to Main App
   */
  static goToMain() {
    AppNavigation.reset('Main');
  }

  /**
   * Navigate to Home Screen (tab screen)
   */
  static goToHome() {
    AppNavigation.navigate('Home');
  }

  /**
   * Navigate to Settings Screen (modal screen from tab)
   */
  static goToSettings() {
    AppNavigation.navigateToParent('Settings');
  }

  // ============================================================================
  // APP FLOW HELPERS - Complete Navigation Actions
  // ============================================================================

  /**
   * Complete onboarding and go to main app
   */
  static completeOnboarding() {
    AppNavigation.goToMain();
  }

  /**
   * Go back with fallback route
   */
  static backWithFallback(fallbackRoute: string, fallbackParams?: object) {
    if (AppNavigation.navigationRef && AppNavigation.navigationRef.canGoBack()) {
      AppNavigation.goBack();
    } else {
      AppNavigation.navigate(fallbackRoute, fallbackParams);
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Check if navigation can go back
   */
  static canGoBack(): boolean {
    return AppNavigation.navigationRef ? AppNavigation.navigationRef.canGoBack() : false;
  }

  /**
   * Get current route name
   */
  static getCurrentRouteName(): string | undefined {
    if (!AppNavigation.navigationRef) return undefined;

    const currentRoute = AppNavigation.navigationRef.getCurrentRoute();
    return currentRoute?.name;
  }

  /**
   * Check if current route matches given route name
   */
  static isCurrentRoute(routeName: string): boolean {
    return AppNavigation.getCurrentRouteName() === routeName;
  }
}

