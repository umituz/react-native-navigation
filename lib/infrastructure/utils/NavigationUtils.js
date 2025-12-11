/**
 * Navigation Utilities
 * Provides utility functions for navigation state and helpers
 */
import { NavigationRefManager } from './NavigationRefManager';
export class NavigationUtils {
    /**
     * Check if navigation can go back
     */
    static canGoBack() {
        const ref = NavigationRefManager.getNavigationRef();
        return ref ? ref.canGoBack() : false;
    }
    /**
     * Get current route name
     */
    static getCurrentRouteName() {
        const ref = NavigationRefManager.getNavigationRef();
        if (!ref)
            return undefined;
        const currentRoute = ref.getCurrentRoute();
        return currentRoute?.name;
    }
    /**
     * Check if current route matches given route name
     */
    static isCurrentRoute(routeName) {
        return NavigationUtils.getCurrentRouteName() === routeName;
    }
    /**
     * Go back with fallback route
     */
    static backWithFallback(fallbackRoute, fallbackParams) {
        if (NavigationUtils.canGoBack()) {
            const { NavigationActions } = require('./NavigationActions');
            NavigationActions.goBack();
        }
        else {
            const { NavigationActions } = require('./NavigationActions');
            NavigationActions.navigate(fallbackRoute, fallbackParams);
        }
    }
}
//# sourceMappingURL=NavigationUtils.js.map