import React from "react";
import { StyleSheet } from "react-native";
import {
  Icon as KittyIcon,
  IconProps as KittyIconProps,
  useTheme,
} from "@ui-kitten/components";

type IconProps = KittyIconProps & {
  size: "sm" | "md" | "lg";
};

export const Icon = (props: IconProps) => {
  let style;
  switch (props.size) {
    case "sm":
      style = styles.small;
      break;
    case "md":
    default:
      style = styles.medium;
      break;
  }
  const theme = useTheme();
  return (
    <KittyIcon
      fill={theme["color-primary-default"]}
      {...props}
      style={[style, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  small: {
    height: 24,
    width: 24,
  },
  medium: {
    height: 36,
    width: 36,
  },
});
