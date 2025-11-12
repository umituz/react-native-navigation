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

// =============================================================================
// NAVIGATION THEME
// =============================================================================

export { createNavigationTheme } from './infrastructure/utils/NavigationTheme';

