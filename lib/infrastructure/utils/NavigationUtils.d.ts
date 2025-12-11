/**
 * Navigation Utilities
 * Provides utility functions for navigation state and helpers
 */
export declare class NavigationUtils {
    /**
     * Check if navigation can go back
     */
    static canGoBack(): boolean;
    /**
     * Get current route name
     */
    static getCurrentRouteName(): string | undefined;
    /**
     * Check if current route matches given route name
     */
    static isCurrentRoute(routeName: string): boolean;
    /**
     * Go back with fallback route
     */
    static backWithFallback(fallbackRoute: string, fallbackParams?: object): void;
}
//# sourceMappingURL=NavigationUtils.d.ts.map