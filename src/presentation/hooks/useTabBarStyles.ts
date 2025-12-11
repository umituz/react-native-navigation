/**
 * Tab Bar Styles Hook
 * Provides configurable tab bar styling based on design tokens
 */

import { Platform } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';

export interface TabBarConfig {
  backgroundColor?: string;
  borderTopColor?: string;
  borderTopWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  minHeight?: number;
  activeTintColor?: string;
  inactiveTintColor?: string;
  labelFontSize?: number;
  labelFontWeight?: string;
  labelMarginTop?: number;
  labelMarginBottom?: number;
}

export function useTabBarStyles(config: TabBarConfig = {}) {
  const tokens = useAppDesignTokens();

  const tabBarStyle = {
    backgroundColor: config.backgroundColor || tokens.colors.surface,
    borderTopColor: config.borderTopColor || tokens.colors.borderLight,
    borderTopWidth: config.borderTopWidth ?? 1,
    paddingTop: config.paddingTop ?? 12,
    paddingBottom: config.paddingBottom ?? (Platform.OS === 'ios' ? 24 : 12),
    minHeight: config.minHeight ?? (Platform.OS === 'ios' ? 80 : 70),
  };

  const screenOptions = {
    headerShown: false,
    tabBarLabelStyle: {
      fontSize: config.labelFontSize ?? 12,
      fontWeight: config.labelFontWeight ?? '600',
      marginTop: config.labelMarginTop ?? 12,
      marginBottom: config.labelMarginBottom ?? 4,
    },
    tabBarActiveTintColor: config.activeTintColor || tokens.colors.primary,
    tabBarInactiveTintColor: config.inactiveTintColor || tokens.colors.textSecondary,
    tabBarStyle,
  };

  return {
    tokens,
    screenOptions,
    tabBarStyle,
  };
}