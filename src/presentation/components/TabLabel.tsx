/**
 * Tab Label Component
 * Reusable tab bar label with consistent styling
 */

import React from "react";
import { AtomicText } from "@umituz/react-native-design-system";

interface TabLabelProps {
  label: string;
  focused: boolean;
  color: string;
}

export const TabLabel: React.FC<TabLabelProps> = ({
  label,
  focused,
  color,
}) => (
  <AtomicText
    type="labelSmall"
    style={{
      color,
      textAlign: "center",
      fontSize: 12,
      fontWeight: focused ? "600" : "500",
    }}
  >
    {label}
  </AtomicText>
);
