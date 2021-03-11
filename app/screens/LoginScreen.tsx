import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "@ui-kitten/components";
import { AuthContext } from "../services/context";
import { useNavigation } from "@react-navigation/native";
import { ErrorToast } from "../components";
import { Button } from "../components/Button";

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
      <Button loading={loading} onPress={loginUser}>
        Sign in!
      </Button>
      <ErrorToast error={error} />
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
