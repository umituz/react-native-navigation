/**
 * Type definitions for external dependencies
 */

declare module '@react-navigation/native' {
  export interface NavigationAction {
    type: string;
    payload?: any;
  }

  export interface NavigationState {
    index: number;
    routes: NavigationRoute[];
    history?: NavigationRoute[];
    key?: string;
    routeNames?: string[];
    type?: string;
  }

  export interface NavigationRoute {
    key: string;
    name: string;
    params?: object;
    state?: NavigationState;
  }

  export interface NavigationContainerRef {
    navigate: (name: string, params?: object) => void;
    push: (name: string, params?: object) => void;
    goBack: () => void;
    canGoBack: () => boolean;
    dispatch: (action: NavigationAction) => void;
    reset: (state: NavigationState) => void;
    replace: (name: string, params?: object) => void;
    getCurrentRoute: () => NavigationRoute | undefined;
    getParent: () => NavigationContainerRef | null;
    isReady: () => boolean;
  }

  export const CommonActions: {
    reset: (state: { index: number; routes: NavigationRoute[] }) => NavigationAction;
    navigate: (name: string, params?: object) => NavigationAction;
    goBack: () => NavigationAction;
  };

  export const StackActions: {
    replace: (name: string, params?: object) => NavigationAction;
    push: (name: string, params?: object) => NavigationAction;
    pop: (count?: number) => NavigationAction;
    popToTop: () => NavigationAction;
  };

  export interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  }
}

declare module '@umituz/react-native-design-system' {
  export interface AtomicTextProps {
    type: 'headingLarge' | 'headingMedium' | 'headingSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall';
    children: React.ReactNode;
    style?: any;
  }

  export const AtomicText: React.FC<AtomicTextProps>;

  export interface DesignTokens {
    colors: {
      primary: string;
      backgroundPrimary: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
      borderLight: string;
      error: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }

  export const useAppDesignTokens: () => DesignTokens;
}

declare module '@umituz/react-native-design-system-theme' {
  export interface ColorPalette {
    primary: string;
    backgroundPrimary: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    borderLight: string;
    error: string;
  }

  export interface ExtendedColorPalette extends ColorPalette {
    [key: string]: string;
  }
}