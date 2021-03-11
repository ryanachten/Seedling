import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "./types";
import UnauthenticatedNavigator from "./UnauthenticatedNavigation";
import AuthenticatedNavigator, {
  SettingsNavigator,
} from "./AuthenticatedNavigation";
import LinkingConfiguration from "./LinkingConfiguration";
import { AuthContext } from "../services/context";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {
    actions: { restoreToken },
    state: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Root" component={AuthenticatedNavigator} />
          <Stack.Screen name="Settings" component={SettingsNavigator} />
        </>
      ) : (
        <Stack.Screen name="Root" component={UnauthenticatedNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
