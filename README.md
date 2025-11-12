# @umituz/react-native-navigation

Comprehensive navigation system for React Native apps - Navigation utilities, theme helpers, and navigation management.

## Features

- ✅ **Centralized navigation utilities** - `AppNavigation` class for type-safe navigation
- ✅ **Navigation theme helpers** - Create React Navigation themes from design system colors
- ✅ **Tab and Stack navigators** - Re-exports from `@umituz/react-native-tabs-bottom-navigator`
- ✅ **Type-safe navigation** - Full TypeScript support
- ✅ **Predefined routes** - Common navigation patterns (goToHome, goToSettings, etc.)
- ✅ **Stack-aware routing** - Navigate between tabs, modals, and stacks

## Installation

```bash
npm install @umituz/react-native-navigation
```

## Peer Dependencies

```bash
npm install @react-navigation/native @umituz/react-native-design-system-theme
```

## Usage

### Navigation Utilities

```tsx
import { AppNavigation } from '@umituz/react-native-navigation';

// Set navigation reference (in App.tsx)
AppNavigation.setNavigationRef(navigationRef.current);

// Navigate to screen
AppNavigation.navigate('Home');

// Navigate to parent navigator (for modals)
AppNavigation.navigateToParent('Settings');

// Predefined routes
AppNavigation.goToHome();
AppNavigation.goToSettings();
AppNavigation.goToMain();
```

### Navigation Theme

```tsx
import { createNavigationTheme } from '@umituz/react-native-navigation';
import { useTheme, useAppDesignTokens } from '@umituz/react-native-design-system-theme';

function App() {
  const { themeMode } = useTheme();
  const tokens = useAppDesignTokens();
  const navigationTheme = createNavigationTheme(tokens.colors, themeMode);

  return (
    <NavigationContainer theme={navigationTheme}>
      {/* Your app */}
    </NavigationContainer>
  );
}
```

### Tab and Stack Navigators

```tsx
import { createTabNavigator, createStackNavigator } from '@umituz/react-native-navigation';

// Use tab navigator
const TabNavigator = createTabNavigator(tabConfig, options);

// Use stack navigator
const StackNavigator = createStackNavigator(stackConfig);
```

## API Reference

### `AppNavigation`

Centralized navigation utility class.

**Methods:**
- `setNavigationRef(ref)` - Set navigation reference
- `navigate(routeName, params?)` - Navigate to screen
- `navigateToParent(routeName, params?)` - Navigate to parent navigator
- `navigateToStack(stackName, screenName, params?)` - Navigate to specific stack screen
- `goBack()` - Go back to previous screen
- `reset(routeName, params?)` - Reset navigation stack
- `replace(routeName, params?)` - Replace current screen
- `goToHome()` - Navigate to home
- `goToSettings()` - Navigate to settings
- `goToMain()` - Navigate to main app
- `canGoBack()` - Check if can go back
- `getCurrentRouteName()` - Get current route name

### `createNavigationTheme(colors, themeMode)`

Create React Navigation theme from design system colors.

**Parameters:**
- `colors` - Design system color palette
- `themeMode` - 'light' | 'dark'

**Returns:** React Navigation theme object

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

