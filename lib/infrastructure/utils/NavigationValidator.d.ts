/**
 * Navigation Validation Utilities
 * Provides input validation and sanitization for navigation
 */
export declare class NavigationValidator {
    /**
     * Validate route name format
     */
    static isValidRouteName(routeName: string): boolean;
    /**
     * Validate navigation parameters
     */
    static isValidParams(params: unknown): boolean;
    /**
     * Check for potential script injection
     */
    static containsScript(value: string): boolean;
    /**
     * Sanitize route name
     */
    static sanitizeRouteName(routeName: string): string;
    /**
     * Validate stack name
     */
    static isValidStackName(stackName: string): boolean;
    /**
     * Validate screen name
     */
    static isValidScreenName(screenName: string): boolean;
    /**
     * Validate navigation input and throw error if invalid
     */
    static validateNavigationInput(routeName: string, params?: unknown, stackName?: string, screenName?: string): void;
}
//# sourceMappingURL=NavigationValidator.d.ts.map