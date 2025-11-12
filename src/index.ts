/**
 * @umituz/react-native-navigation - Public API
 *
 * Comprehensive navigation system for React Native apps
 * Provides navigation utilities, theme helpers, and navigation management
 *
 * Usage:
 *   import { AppNavigation, createNavigationTheme } from '@umituz/react-native-navigation';
 *   import { createTabNavigator, createStackNavigator } from '@umituz/react-native-navigation';
 */

// =============================================================================
// NAVIGATION UTILITIES
// =============================================================================

export { AppNavigation } from './infrastructure/utils/AppNavigation';

// =============================================================================
// NAVIGATION THEME
// =============================================================================

export { createNavigationTheme } from './infrastructure/utils/NavigationTheme';

// =============================================================================
// NAVIGATORS (Re-export from tabs-bottom-navigator)
// =============================================================================

export {
  createTabNavigator,
  createStackNavigator,
  useTabNavigation,
  useTabBadge,
  TabIcon,
  TabBarBadge,
} from '@umituz/react-native-tabs-bottom-navigator';

export type {
  TabNavigatorConfig,
  StackNavigatorConfig,
  TabConfig,
  StackScreenConfig,
  TabBadge,
  TabIconConfig,
  UseTabNavigationReturn,
  UseTabBadgeReturn,
  BadgeStateMap,
  TabIconProps,
  TabBarBadgeProps,
  CreateTabNavigatorOptions,
  TabScreenProps,
  StackScreenProps,
} from '@umituz/react-native-tabs-bottom-navigator';

