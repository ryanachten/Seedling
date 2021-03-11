import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Margin } from "../constants/Sizes";
import { Icon } from "./Icon";

export const SettingsButton = () => {
  const nav = useNavigation();
  return (
    <Icon
      size="sm"
      name="more-horizontal-outline"
      onPress={() => nav.navigate("Settings")}
      style={styles.settingsWrapper}
    />
  );
};

const styles = StyleSheet.create({
  settingsWrapper: {
    marginRight: Margin.md,
  },
});
