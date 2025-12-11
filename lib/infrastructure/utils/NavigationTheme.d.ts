/**
 * Navigation Theme Helper
 *
 * Creates React Navigation theme from design system colors
 */
import type { Theme as NavigationTheme } from '@react-navigation/native';
import type { ColorPalette, ExtendedColorPalette } from '@umituz/react-native-design-system-theme';
/**
 * Create navigation theme from design system colors
 * @param colors - Design system color palette (can be ColorPalette or ExtendedColorPalette)
 * @param themeMode - Theme mode ('light' | 'dark')
 * @returns React Navigation theme object
 */
export declare const createNavigationTheme: (colors: ColorPalette | ExtendedColorPalette, themeMode: "light" | "dark") => NavigationTheme;
//# sourceMappingURL=NavigationTheme.d.ts.map