import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "@ui-kitten/components";
import { AuthContext } from "../services/context";

export default function LoginScreen() {
  const [email, setEmail] = useState("ryantest@305.com");
  const [password, setPassword] = useState("Password1");
  const {
    state: { loading, error },
    actions: { signIn },
  } = useContext(AuthContext);

  const loginUser = () => signIn(email, password);
  console.log(loading, error);

  return (
    <View style={styles.container}>
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
      <Button onPress={loginUser}>Sign in!</Button>
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
