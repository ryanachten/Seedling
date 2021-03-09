import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, useTheme } from "@ui-kitten/components";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import { AuthenticatedParamList, HomeParamList } from "./types";

const BottomTab = createBottomTabNavigator<AuthenticatedParamList>();

export default function AuthenticatedNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: theme["color-primary-default"] }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
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
    </BottomTab.Navigator>
  );
}

const LoginStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </LoginStack.Navigator>
  );
}
