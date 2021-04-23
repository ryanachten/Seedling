import React from "react";
import { Text } from "@ui-kitten/components";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Margin } from "../../constants/Sizes";

interface InfoItemProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export const InfoItem = ({ label, value, style }: InfoItemProps) => (
  <View style={[styles.infoItem, style]}>
    <Text category="label">{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoItem: {
    marginBottom: Margin.sm,
  },
});
