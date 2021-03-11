import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background } from "../components";

export default function HomeScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);

  return (
    <Background style={styles.container}>
      <Text category="h1">Home!</Text>
      <Button onPress={() => signOut()}>Log out</Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
