import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "@ui-kitten/components";

export default function TabOneScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {},
});
