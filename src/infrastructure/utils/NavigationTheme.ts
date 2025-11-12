/**
 * Navigation Theme Helper
 *
 * Creates React Navigation theme from design system colors
 */

import { Theme as NavigationTheme } from '@react-navigation/native';
import type { Theme } from '@umituz/react-native-design-system-theme';

/**
 * Create navigation theme from design system colors
 * @param colors - Design system color palette
 * @param themeMode - Theme mode ('light' | 'dark')
 * @returns React Navigation theme object
 */
export const createNavigationTheme = (
  colors: Theme['colors'],
  themeMode: 'light' | 'dark'
): NavigationTheme => ({
  dark: themeMode === 'dark',
  colors: {
    primary: colors.primary,
    background: colors.backgroundPrimary,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.borderLight,
    notification: colors.error,
  },
});

