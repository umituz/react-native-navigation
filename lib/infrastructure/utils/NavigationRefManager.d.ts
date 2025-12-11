/**
 * Navigation Reference Manager
 * Manages the navigation reference for the entire application
 */
import type { NavigationContainerRef } from '@react-navigation/native';
export declare class NavigationRefManager {
    private static navigationRef;
    /**
     * Set navigation reference
     */
    static setNavigationRef(ref: NavigationContainerRef | null): void;
    /**
     * Get current navigation reference
     */
    static getNavigationRef(): NavigationContainerRef | null;
    /**
     * Check if navigation reference is available
     */
    static isNavigationReady(): boolean;
    /**
     * Execute navigation action safely
     */
    static executeNavigationAction(action: () => void): void;
    /**
     * Clean up navigation reference to prevent memory leaks
     */
    static cleanup(): void;
}
//# sourceMappingURL=NavigationRefManager.d.ts.map