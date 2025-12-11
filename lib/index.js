/**
 * @umituz/react-native-navigation - Public API
 *
 * Comprehensive navigation system for React Native apps
 * Provides navigation utilities, theme helpers, and navigation management
 *
 * Usage:
 *   import { AppNavigation, createNavigationTheme } from '@umituz/react-native-navigation';
 *
 * NOTE: For tab and stack navigators, use @umituz/react-native-tabs-bottom-navigator directly:
 *   import { createTabNavigator, createStackNavigator } from '@umituz/react-native-tabs-bottom-navigator';
 */
// =============================================================================
// NAVIGATION UTILITIES
// =============================================================================
export { AppNavigation } from './infrastructure/utils/AppNavigation';
export { NavigationRefManager } from './infrastructure/utils/NavigationRefManager';
export { NavigationActions } from './infrastructure/utils/NavigationActions';
export { NavigationUtils } from './infrastructure/utils/NavigationUtils';
export { NavigationValidator } from './infrastructure/utils/NavigationValidator';
// =============================================================================
// NAVIGATION THEME
// =============================================================================
export { createNavigationTheme } from './infrastructure/utils/NavigationTheme';
// =============================================================================
// COMPONENTS
// =============================================================================
export { TabLabel } from './presentation/components/TabLabel';
// =============================================================================
// HOOKS
// =============================================================================
export { useTabBarStyles } from './presentation/hooks/useTabBarStyles';
//# sourceMappingURL=index.js.map