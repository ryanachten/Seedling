import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, useTheme } from "@ui-kitten/components";
import * as React from "react";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  UnauthenticatedParamList,
  LoginParamList,
  RegisterParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<UnauthenticatedParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: theme["color-primary-default"] }}
    >
      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              style={{
                width: size,
                height: size,
              }}
              name="person-outline"
              fill={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={RegisterNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              style={{
                width: size,
                height: size,
              }}
              name="edit-outline"
              fill={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Sign in!" }}
      />
    </LoginStack.Navigator>
  );
}

const RegisterStack = createStackNavigator<RegisterParamList>();

function RegisterNavigator() {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "Sign up!" }}
      />
    </RegisterStack.Navigator>
  );
}
