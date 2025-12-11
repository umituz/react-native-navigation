/**
 * Navigation Actions
 * Provides basic navigation operations
 */
import { CommonActions, StackActions } from '@react-navigation/native';
import { NavigationRefManager } from './NavigationRefManager';
export class NavigationActions {
    /**
     * Navigate to screen within current navigator
     */
    static navigate(routeName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            ref?.navigate(routeName, params);
        });
    }
    /**
     * Navigate to screen in parent navigator
     */
    static navigateToParent(routeName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            const parent = ref?.getParent();
            if (parent) {
                parent.navigate(routeName, params);
            }
            else {
                ref?.navigate(routeName, params);
            }
        });
    }
    /**
     * Navigate to specific screen in specific stack
     */
    static navigateToStack(stackName, screenName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            ref?.navigate(stackName, {
                screen: screenName,
                params,
            });
        });
    }
    /**
     * Push new screen onto stack
     */
    static push(routeName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            ref?.push(routeName, params);
        });
    }
    /**
     * Go back to previous screen
     */
    static goBack() {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            if (ref?.canGoBack()) {
                ref.goBack();
            }
        });
    }
    /**
     * Reset navigation stack to specific route
     */
    static reset(routeName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            ref?.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ key: routeName, name: routeName, params }],
            }));
        });
    }
    /**
     * Replace current screen
     */
    static replace(routeName, params) {
        NavigationRefManager.executeNavigationAction(() => {
            const ref = NavigationRefManager.getNavigationRef();
            ref?.dispatch(StackActions.replace(routeName, params));
        });
    }
}
//# sourceMappingURL=NavigationActions.js.map