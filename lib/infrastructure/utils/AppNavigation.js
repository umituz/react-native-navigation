/**
 * AppNavigation Utility
 *
 * Centralized navigation helper functions for React Native apps
 * Provides type-safe navigation methods and utilities
 */
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
    static setNavigationRef(ref) {
        NavigationRefManager.setNavigationRef(ref);
    }
    /**
     * Get current navigation reference
     */
    static getNavigationRef() {
        return NavigationRefManager.getNavigationRef();
    }
    /**
     * Navigate to screen within current navigator
     */
    static navigate(routeName, params) {
        NavigationActions.navigate(routeName, params);
    }
    /**
     * Navigate to screen in parent navigator
     */
    static navigateToParent(routeName, params) {
        NavigationActions.navigateToParent(routeName, params);
    }
    /**
     * Navigate to specific screen in specific stack
     */
    static navigateToStack(stackName, screenName, params) {
        NavigationActions.navigateToStack(stackName, screenName, params);
    }
    /**
     * Push new screen onto stack
     */
    static push(routeName, params) {
        NavigationActions.push(routeName, params);
    }
    /**
     * Go back to previous screen
     */
    static goBack() {
        NavigationActions.goBack();
    }
    /**
     * Reset navigation stack to specific route
     */
    static reset(routeName, params) {
        NavigationActions.reset(routeName, params);
    }
    /**
     * Replace current screen
     */
    static replace(routeName, params) {
        NavigationActions.replace(routeName, params);
    }
    /**
     * Check if navigation can go back
     */
    static canGoBack() {
        return NavigationUtils.canGoBack();
    }
    /**
     * Get current route name
     */
    static getCurrentRouteName() {
        return NavigationUtils.getCurrentRouteName();
    }
    /**
     * Check if current route matches given route name
     */
    static isCurrentRoute(routeName) {
        return NavigationUtils.isCurrentRoute(routeName);
    }
    /**
     * Go back with fallback route
     */
    static backWithFallback(fallbackRoute, fallbackParams) {
        NavigationUtils.backWithFallback(fallbackRoute, fallbackParams);
    }
}
//# sourceMappingURL=AppNavigation.js.map