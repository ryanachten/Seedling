import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Margin } from "../constants/Sizes";

type BackgroundProps = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
};

export const Background = ({ children, style }: BackgroundProps) => (
  <View style={[styles.root, style]}>{children}</View>
);

const styles = StyleSheet.create({
  root: {
    paddingLeft: Margin.md,
    paddingRight: Margin.md,
  },
});
