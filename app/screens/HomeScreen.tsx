import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { AuthContext } from "../services/context";

export default function HomeScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text category="h1">Home!</Text>
      <Button onPress={() => signOut()}>Log out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
