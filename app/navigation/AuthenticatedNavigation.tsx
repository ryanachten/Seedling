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

import HomeScreen from "../screens/HomeScreen";
import PlantsScreen from "../screens/PlantsScreen";
import { AuthenticatedParamList, HomeParamList, PlantParamList } from "./types";

const BottomTab = createBottomTabNavigator<AuthenticatedParamList>();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Home"
      icon={(props) => <Icon {...props} name="home-outline" />}
    />
    <BottomNavigationTab
      title="Plants"
      icon={(props) => <Icon {...props} name="droplet-outline" />}
    />
  </BottomNavigation>
);

export default function AuthenticatedNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: theme["color-primary-default"] }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <BottomTab.Screen name="Home" component={HomeNavigator} />
      <BottomTab.Screen name="Plants" component={PlantNavigator} />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const PlantStack = createStackNavigator<PlantParamList>();
function PlantNavigator() {
  return (
    <PlantStack.Navigator>
      <PlantStack.Screen
        name="PlantsScreen"
        component={PlantsScreen}
        options={{ headerTitle: "Plants" }}
      />
    </PlantStack.Navigator>
  );
}
