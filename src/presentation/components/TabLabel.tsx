/**
 * Tab Label Component
 * Reusable tab bar label with configurable styling
 */

import React from 'react';
import { AtomicText } from '@umituz/react-native-design-system';

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

export const TabLabel: React.FC<TabLabelProps> = ({
  label,
  focused,
  color,
  focusedColor,
  unfocusedColor,
  fontSize,
  focusedWeight = '600',
  unfocusedWeight = '500',
  textStyle,
  textType = 'labelSmall',
}) => {
  const textColor = color || (focused ? focusedColor : unfocusedColor);
  const fontWeight = focused ? focusedWeight : unfocusedWeight;

  return (
    <AtomicText
      type={textType}
      style={[
        {
          color: textColor,
          textAlign: 'center',
          fontSize,
          fontWeight,
        },
        textStyle,
      ]}
    >
      {label}
    </AtomicText>
  );
};