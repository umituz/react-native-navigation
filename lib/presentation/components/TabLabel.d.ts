/**
 * Tab Label Component
 * Reusable tab bar label with configurable styling
 */
import React from 'react';
export interface TabLabelProps {
    label: string;
    focused: boolean;
    color?: string;
    focusedColor?: string;
    unfocusedColor?: string;
    fontSize?: number;
    focusedWeight?: '400' | '500' | '600' | '700' | '800' | '900';
    unfocusedWeight?: '400' | '500' | '600' | '700' | '800' | '900';
    textStyle?: any;
    textType?: 'labelSmall' | 'labelMedium' | 'labelLarge' | 'bodySmall';
}
export declare const TabLabel: React.FC<TabLabelProps>;
//# sourceMappingURL=TabLabel.d.ts.map