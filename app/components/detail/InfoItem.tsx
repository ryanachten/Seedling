import React from "react";
import {Text} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Margin } from "../../constants/Sizes";

export const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoItem}>
      <Text category="label">{label}</Text>
      <Text>{value}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    infoItem: {
      marginBottom: Margin.sm,
    },
}