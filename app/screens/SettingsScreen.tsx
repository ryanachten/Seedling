import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Background } from "../components";
import { Margin } from "../constants/Sizes";
import { AuthContext } from "../services/context";
import { useSelector } from "react-redux";
import { getUser } from "../selectors/user.selectors";

export default function SettingsScreen() {
  const { firstName, lastName, email } = useSelector(getUser);
  const {
    actions: { signOut },
  } = useContext(AuthContext);

  return (
    <Background>
      <Text category="h5" style={styles.name}>
        {firstName} {lastName}
      </Text>
      <Text category="s1" style={styles.spacing}>
        {email}
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
