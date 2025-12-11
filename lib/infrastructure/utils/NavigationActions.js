/**
 * Navigation Actions
 * Provides basic navigation operations
 */
import { CommonActions, StackActions } from '@react-navigation/native';
import { NavigationRefManager } from './NavigationRefManager';
import { NavigationValidator } from './NavigationValidator';
export class NavigationActions {
    /**
     * Navigate to screen within current navigator
     * @returns true if navigation was successful, false otherwise
     */
    static navigate(routeName, params) {
        try {
            NavigationValidator.validateNavigationInput(routeName, params);
            let success = false;
            NavigationRefManager.executeNavigationAction(() => {
                const ref = NavigationRefManager.getNavigationRef();
                if (ref) {
                    ref.navigate(routeName, params);
                    success = true;
                }
            });
            return success;
        }
        catch (error) {
            if (__DEV__) {
                console.error('Navigation validation failed:', error);
            }
            return false;
        }
    }
    /**
     * Navigate to screen in parent navigator
     * @returns true if navigation was successful, false otherwise
     */
    static navigateToParent(routeName, params) {
        try {
            NavigationValidator.validateNavigationInput(routeName, params);
            let success = false;
            NavigationRefManager.executeNavigationAction(() => {
                const ref = NavigationRefManager.getNavigationRef();
                const parent = ref?.getParent();
                if (parent) {
                    parent.navigate(routeName, params);
                    success = true;
                }
                else if (ref) {
                    ref.navigate(routeName, params);
                    success = true;
                }
            });
            return success;
        }
        catch (error) {
            if (__DEV__) {
                console.error('Parent navigation validation failed:', error);
            }
            return false;
        }
    }
    /**
     * Navigate to specific screen in specific stack
     */
    static navigateToStack(stackName, screenName, params) {
        try {
            NavigationValidator.validateNavigationInput(screenName, params, stackName);
            NavigationRefManager.executeNavigationAction(() => {
                const ref = NavigationRefManager.getNavigationRef();
                ref?.navigate(stackName, {
                    screen: screenName,
                    params,
                });
            });
        }
        catch (error) {
            if (__DEV__) {
                console.error('Stack navigation validation failed:', error);
            }
        }
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