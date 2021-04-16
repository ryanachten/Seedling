import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { Margin } from "../constants/Sizes";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../reducers/auth.reducer";
import { hasAuthError, isAuthLoading } from "../selectors/auth.selectors";

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const loading = useSelector(isAuthLoading);
  const error = useSelector(hasAuthError);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () =>
    dispatch(
      signUp.started({
        firstName,
        lastName,
        password,
        email,
      })
    );
  return (
    <Background>
      <ScrollView>
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
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: Margin.sm,
  },
});
