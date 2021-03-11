import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  UnauthenticatedParamList,
  LoginParamList,
  RegisterParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<UnauthenticatedParamList>();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Sign In"
      icon={(props) => <Icon {...props} name="person-outline" />}
    />
    <BottomNavigationTab
      title="Sign Up"
      icon={(props) => <Icon {...props} name="edit-outline" />}
    />
  </BottomNavigation>
);

export default function UnauthenticatedNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: theme["color-primary-default"] }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <BottomTab.Screen name="Login" component={LoginNavigator} />
      <BottomTab.Screen name="Register" component={RegisterNavigator} />
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
