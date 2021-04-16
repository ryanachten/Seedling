import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Background } from "../components";
import { Margin } from "../constants/Sizes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../selectors/user.selectors";
import { signOut } from "../reducers/auth.reducer";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(getUser);

  return (
    <Background>
      <Text category="h5" style={styles.name}>
        {firstName} {lastName}
      </Text>
      <Text category="s1" style={styles.spacing}>
        {email}
      </Text>
      <Button
        appearance="outline"
        onPress={() => dispatch(signOut.started(undefined))}
        style={styles.spacing}
      >
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
