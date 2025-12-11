/**
 * Navigation Actions
 * Provides basic navigation operations
 */
export declare class NavigationActions {
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
}
//# sourceMappingURL=NavigationActions.d.ts.map