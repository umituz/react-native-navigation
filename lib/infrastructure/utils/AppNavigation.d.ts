/**
 * AppNavigation Utility
 *
 * Centralized navigation helper functions for React Native apps
 * Provides type-safe navigation methods and utilities
 */
import type { NavigationContainerRef } from '@react-navigation/native';
/**
 * Navigation helper functions for centralized routing
 */
export declare class AppNavigation {
    /**
     * Set navigation reference
     */
    static setNavigationRef(ref: NavigationContainerRef | null): void;
    /**
     * Get current navigation reference
     */
    static getNavigationRef(): NavigationContainerRef | null;
    /**
     * Navigate to screen within current navigator
     */
    static navigate(routeName: string, params?: object): void;
    /**
     * Navigate to screen in parent navigator
     */
    static navigateToParent(routeName: string, params?: object): void;
    /**
     * Navigate to specific screen in specific stack
     */
    static navigateToStack(stackName: string, screenName: string, params?: object): void;
    /**
     * Push new screen onto stack
     */
    static push(routeName: string, params?: object): void;
    /**
     * Go back to previous screen
     */
    static goBack(): void;
    /**
     * Reset navigation stack to specific route
     */
    static reset(routeName: string, params?: object): void;
    /**
     * Replace current screen
     */
    static replace(routeName: string, params?: object): void;
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
//# sourceMappingURL=AppNavigation.d.ts.map