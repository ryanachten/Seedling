import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  UnauthenticatedParamList,
  LoginParamList,
  RegisterParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<UnauthenticatedParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Login"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const LoginStack = createStackNavigator<LoginParamList>();

function TabOneNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Sign in!" }}
      />
    </LoginStack.Navigator>
  );
}

const RegisterStack = createStackNavigator<RegisterParamList>();

function TabTwoNavigator() {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="RegisterScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Sign up!" }}
      />
    </RegisterStack.Navigator>
  );
}
