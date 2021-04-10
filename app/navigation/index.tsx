import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "./types";
import UnauthenticatedNavigator from "./UnauthenticatedNavigation";
import AuthenticatedNavigator, {
  SettingsNavigator,
} from "./AuthenticatedNavigation";
import LinkingConfiguration from "./LinkingConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "../reducers/user.reducer";
import { getToken } from "../selectors/auth.selectors";
import { restoreToken } from "../reducers/auth.reducer";

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
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(restoreToken.started(undefined));
    dispatch(restoreUser.started(undefined));
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
