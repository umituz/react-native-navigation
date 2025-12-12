/**
 * Navigation Configuration Types
 * Provides configuration interfaces for generic navigation setup
 */

export interface NavigationRouteConfig {
  name: string;
  params?: object;
}

export interface NavigationConfig {
  routes?: Record<string, NavigationRouteConfig>;
  defaultRoutes?: {
    home?: string;
    settings?: string;
    main?: string;
  };
}

export interface NavigationPerformanceConfig {
  enableCache?: boolean;
  maxCacheSize?: number;
  enableValidation?: boolean;
  enableDevLogs?: boolean;
}