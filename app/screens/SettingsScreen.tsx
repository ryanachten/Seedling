import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Background } from "../components";
import { Margin } from "../constants/Sizes";
import { AuthContext, UserContext } from "../services/context";
import Constants from "expo-constants";

export default function SettingsScreen() {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    actions: { signOut },
  } = useContext(AuthContext);

  return (
    <Background>
      <Text category="h5" style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>
      <Text category="s1" style={styles.spacing}>
        {user.email}
      </Text>
      <Button appearance="outline" onPress={signOut} style={styles.spacing}>
        Log out
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: Margin.md,
  },
  name: {
    marginBottom: Margin.sm,
  },
  spacing: {
    marginBottom: Margin.md,
  },
});
