/**
 * Navigation Theme Helper
 *
 * Creates React Navigation theme from design system colors
 */
/**
 * Create navigation theme from design system colors
 * @param colors - Design system color palette (can be ColorPalette or ExtendedColorPalette)
 * @param themeMode - Theme mode ('light' | 'dark')
 * @returns React Navigation theme object
 */
export const createNavigationTheme = (colors, themeMode) => ({
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
//# sourceMappingURL=NavigationTheme.js.map