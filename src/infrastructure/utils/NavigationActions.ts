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
  static navigate(routeName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(routeName, params);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.navigate(routeName, params);
      });
      return true;
    } catch (error) {
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
  static navigateToParent(routeName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(routeName, params);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        const parent = ref.getParent();
        if (parent) {
          parent.navigate(routeName, params);
        } else {
          ref.navigate(routeName, params);
        }
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Parent navigation validation failed:', error);
      }
      return false;
    }
  }

  /**
   * Navigate to specific screen in specific stack
   * @returns true if navigation was successful, false otherwise
   */
  static navigateToStack(stackName: string, screenName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(screenName, params, stackName);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.navigate(stackName, {
          screen: screenName,
          params,
        });
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Stack navigation validation failed:', error);
      }
      return false;
    }
  }

  /**
   * Push new screen onto stack
   * @returns true if navigation was successful, false otherwise
   */
  static push(routeName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(routeName, params);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.push(routeName, params);
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Push navigation validation failed:', error);
      }
      return false;
    }
  }

  /**
   * Go back to previous screen
   * @returns true if navigation was successful, false otherwise
   */
  static goBack(): boolean {
    try {
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref || !ref.canGoBack()) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.goBack();
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Go back navigation failed:', error);
      }
      return false;
    }
  }

  /**
   * Reset navigation stack to specific route
   * @returns true if navigation was successful, false otherwise
   */
  static reset(routeName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(routeName, params);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ key: routeName, name: routeName, params }],
          })
        );
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Reset navigation failed:', error);
      }
      return false;
    }
  }

  /**
   * Replace current screen
   * @returns true if navigation was successful, false otherwise
   */
  static replace(routeName: string, params?: object): boolean {
    try {
      NavigationValidator.validateNavigationInput(routeName, params);
      const ref = NavigationRefManager.getNavigationRef();
      if (!ref) return false;

      NavigationRefManager.executeNavigationAction(() => {
        ref.dispatch(StackActions.replace(routeName, params));
      });
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Replace navigation failed:', error);
      }
      return false;
    }
  }
}