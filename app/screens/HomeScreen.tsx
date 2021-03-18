import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Background } from "../components";

export default function HomeScreen() {
  return (
    <Background style={styles.container}>
      <Text category="h1">Home!</Text>
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
