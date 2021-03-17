import React from "react";
import { StyleSheet, View } from "react-native";
import { Margin } from "../constants/Sizes";

export const Background = ({ children, style }: View["props"]) => (
  <View style={[styles.root, style]}>{children}</View>
);

const styles = StyleSheet.create({
  root: {
    padding: Margin.md,
  },
});
