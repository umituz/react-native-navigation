/**
 * Tab Bar Styles Hook
 * Provides configurable tab bar styling based on design tokens
 */
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
export declare function useTabBarStyles(config?: TabBarConfig): {
    tokens: import("@umituz/react-native-design-system").DesignTokens;
    screenOptions: {
        headerShown: boolean;
        tabBarLabelStyle: {
            fontSize: number;
            fontWeight: string;
            marginTop: number;
            marginBottom: number;
        };
        tabBarActiveTintColor: string;
        tabBarInactiveTintColor: string;
        tabBarStyle: {
            backgroundColor: string;
            borderTopColor: string;
            borderTopWidth: number;
            paddingTop: number;
            paddingBottom: number;
            minHeight: number;
        };
    };
    tabBarStyle: {
        backgroundColor: string;
        borderTopColor: string;
        borderTopWidth: number;
        paddingTop: number;
        paddingBottom: number;
        minHeight: number;
    };
};
//# sourceMappingURL=useTabBarStyles.d.ts.map