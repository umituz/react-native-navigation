/**
 * Tab Label Component
 * Reusable tab bar label with configurable styling
 */
import React from 'react';
import { AtomicText } from '@umituz/react-native-design-system';
export const TabLabel = ({ label, focused, color, focusedColor, unfocusedColor, fontSize, focusedWeight = '600', unfocusedWeight = '500', textStyle, textType = 'labelSmall', }) => {
    const textColor = color || (focused ? focusedColor : unfocusedColor);
    const fontWeight = focused ? focusedWeight : unfocusedWeight;
    return (<AtomicText type={textType} style={[
            {
                color: textColor,
                textAlign: 'center',
                fontSize,
                fontWeight,
            },
            textStyle,
        ]}>
      {label}
    </AtomicText>);
};
//# sourceMappingURL=TabLabel.js.map