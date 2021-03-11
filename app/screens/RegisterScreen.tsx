import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { Background, Button, ErrorToast } from "../components";
import { Margin } from "../constants/Sizes";

export default function TabTwoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    actions: { signUp },
    state: { error, loading },
  } = useContext(AuthContext);

  const registerUser = () =>
    signUp({
      firstName,
      lastName,
      password,
      email,
    });
  return (
    <Background style={styles.container}>
      <Input
        label="First name"
        placeholder="John"
        value={firstName}
        onChange={(e) => setFirstName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        label="Last name"
        placeholder="Smith"
        value={lastName}
        onChange={(e) => setLastName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        autoCapitalize="none"
        label="Email"
        placeholder="seedling@user.com"
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        label="Password"
        placeholder="••••••••••••"
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        style={styles.input}
      />
      <Button loading={loading} onPress={registerUser}>
        Sign up!
      </Button>
      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: Margin.sm,
  },
});
