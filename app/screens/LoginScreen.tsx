import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Input } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { useNavigation } from "@react-navigation/native";
import { Background, Button, ErrorToast } from "../components";
import { Margin } from "../constants/Sizes";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state: { loading, error },
    actions: { signIn },
  } = useContext(AuthContext);
  const nav = useNavigation();

  const loginUser = () => {
    signIn(email, password);
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
