import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text category="h3" style={styles.title}>
        Tab One
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title: {},
});
