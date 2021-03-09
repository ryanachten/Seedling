import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "@ui-kitten/components";
import { AuthContext } from "../services/context";

export default function TabTwoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    actions: { signUp },
  } = useContext(AuthContext);

  const registerUser = () =>
    signUp({
      firstName,
      lastName,
      password,
      email,
    });
  return (
    <View style={styles.container}>
      <Input
        label="First name"
        placeholder="John"
        value={firstName}
        onChange={(e) => setFirstName(e.nativeEvent.text)}
      />
      <Input
        label="Last name"
        placeholder="Smith"
        value={lastName}
        onChange={(e) => setLastName(e.nativeEvent.text)}
      />
      <Input
        autoCapitalize="none"
        label="Email"
        placeholder="seedling@user.com"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <Button onPress={registerUser}>Sign up!</Button>
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
