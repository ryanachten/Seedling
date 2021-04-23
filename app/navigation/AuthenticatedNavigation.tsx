import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { BackButton, SettingsButton } from "../components";
import { EditPlantScreen } from "../screens/EditPlantScreen";

import HomeScreen from "../screens/HomeScreen";
import { PlantDetailScreen } from "../screens/PlantDetailScreen";
import PlantsScreen from "../screens/PlantsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  AuthenticatedParamList,
  HomeParamList,
  PlantParamList,
  SettingsParamList,
} from "./types";

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

const sharedScreenOptions: StackNavigationOptions = {
  headerRight: () => <SettingsButton />,
  headerLeft: (props: StackHeaderLeftButtonProps) => <BackButton {...props} />,
  headerTitleAlign: "center",
};

export default function AuthenticatedNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={sharedScreenOptions}
      initialRouteName="Plants"
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
    <PlantStack.Navigator screenOptions={sharedScreenOptions}>
      <PlantStack.Screen
        name="PlantsScreen"
        component={PlantsScreen}
        options={{ headerTitle: "Plants" }}
      />
      <PlantStack.Screen
        name="PlantDetailScreen"
        component={PlantDetailScreen}
        options={{ headerTitle: "Plant" }}
      />
      <PlantStack.Screen
        name="EditPlantScreen"
        component={EditPlantScreen}
        options={{ headerTitle: "Edit Plant" }}
      />
    </PlantStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();
export function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={sharedScreenOptions}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: "Settings" }}
      />
    </SettingsStack.Navigator>
  );
}
