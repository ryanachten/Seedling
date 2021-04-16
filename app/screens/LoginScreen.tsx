import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Background, Button, ErrorToast } from "../components";
import { Margin } from "../constants/Sizes";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../reducers/auth.reducer";
import { hasAuthError, isAuthLoading } from "../selectors/auth.selectors";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(isAuthLoading);
  const error = useSelector(hasAuthError);
  const nav = useNavigation();

  const loginUser = () => {
    dispatch(signIn.started({ email, password }));
  };

  return (
    <Background>
      <ScrollView>
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
        <Button loading={loading} onPress={loginUser}>
          Sign in!
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
