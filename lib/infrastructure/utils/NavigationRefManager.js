/**
 * Navigation Reference Manager
 * Manages the navigation reference for the entire application
 */
export class NavigationRefManager {
    /**
     * Set navigation reference
     */
    static setNavigationRef(ref) {
        NavigationRefManager.navigationRef = ref;
    }
    /**
     * Get current navigation reference
     */
    static getNavigationRef() {
        return NavigationRefManager.navigationRef;
    }
    /**
     * Check if navigation reference is available
     */
    static isNavigationReady() {
        return NavigationRefManager.navigationRef !== null;
    }
    /**
     * Execute navigation action safely
     */
    static executeNavigationAction(action) {
        if (NavigationRefManager.navigationRef) {
            try {
                action();
            }
            catch (error) {
                if (__DEV__) {
                    console.warn('Navigation action failed:', error);
                }
            }
        }
        else if (__DEV__) {
            console.warn('Navigation reference is not available');
        }
    }
}
NavigationRefManager.navigationRef = null;
//# sourceMappingURL=NavigationRefManager.js.map