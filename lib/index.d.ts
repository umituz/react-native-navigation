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
export { AppNavigation } from './infrastructure/utils/AppNavigation';
export { NavigationRefManager } from './infrastructure/utils/NavigationRefManager';
export { NavigationActions } from './infrastructure/utils/NavigationActions';
export { NavigationUtils } from './infrastructure/utils/NavigationUtils';
export { NavigationValidator } from './infrastructure/utils/NavigationValidator';
export { createNavigationTheme } from './infrastructure/utils/NavigationTheme';
export { TabLabel } from './presentation/components/TabLabel';
export type { TabLabelProps } from './presentation/components/TabLabel';
export { useTabBarStyles } from './presentation/hooks/useTabBarStyles';
export type { TabBarConfig } from './presentation/hooks/useTabBarStyles';
//# sourceMappingURL=index.d.ts.map