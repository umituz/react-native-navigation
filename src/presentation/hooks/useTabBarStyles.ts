/**
 * Tab Bar Styles Hook
 * Provides consistent tab bar styling based on design tokens
 */

import { Platform, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

export function useTabBarStyles() {
  const tokens = useAppDesignTokens();

  const tabBarStyle = {
    backgroundColor: tokens.colors.surface,
    borderTopColor: tokens.colors.borderLight,
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    minHeight: Platform.OS === "ios" ? 80 : 70,
  };

  const screenOptions = {
    headerShown: false,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600" as const,
      marginTop: 12,
      marginBottom: 4,
    },
    tabBarActiveTintColor: tokens.colors.primary,
    tabBarInactiveTintColor: tokens.colors.textSecondary,
    tabBarStyle,
  };

  return {
    tokens,
    screenOptions,
    tabBarStyle,
  };
}

export const TAB_ICONS: Record<string, string> = {
  Feed: "Film",
  Home: "House",
  Creations: "Image",
  Profile: "User",
};

export function getTabIcon(routeName: string): string {
  return TAB_ICONS[routeName] || "Circle";
}
