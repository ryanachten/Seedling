import { useNavigation } from "@react-navigation/native";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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

export const BackButton = (
  props: StackHeaderLeftButtonProps & {
    backScreenName?: string;
  }
) => {
  const { canGoBack, label, backScreenName } = props;
  const theme = useTheme();
  const Button = ({ onPress }: { onPress?: () => void }) => (
    <TouchableOpacity
      style={styles.backWrapper}
      {...props}
      onPress={onPress || props.onPress}
    >
      <Icon size="sm" name="chevron-left-outline" />
      <Text
        style={{
          color: theme["color-primary-default"],
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (backScreenName) {
    const nav = useNavigation();
    const goBackToScreen = () => nav.navigate(backScreenName);
    return <Button onPress={goBackToScreen} />;
  }

  return canGoBack ? <Button /> : null;
};

const styles = StyleSheet.create({
  settingsWrapper: {
    marginRight: Margin.md,
  },
  backWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: Margin.sm,
  },
  logoutWrapper: {
    marginRight: Margin.md,
  },
});
