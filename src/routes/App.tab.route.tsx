import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import HomeSvg from "../assets/home.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

import { AppStackRoutes } from "./App.stack.route";
import { MyCars } from "../pages/MyCars";
import { Profile } from "../pages/Profile";
import { Platform } from "react-native";
const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_details,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="AppStackRoutes"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
