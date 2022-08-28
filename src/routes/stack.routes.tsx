import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/Home";
import { CardDetails } from "../pages/CardDetails";
import { Scheduling } from "../pages/Scheduling";
import {  Confirmation } from "../pages/Confirmation";
import { SchudelingDetails } from "../pages/SchudelingDetails";
import { MyCars } from "../pages/MyCars";
import { Splash } from "../pages/Splash";
import { SignIn } from "../pages/SignIn";
import { FirstStep } from "../pages/SignUpFristSteep/SignUpFristSteep";
import { SignUpSecondStepSteep } from "../pages/SignUpFristSteep/SignUpSecondStepSteep";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      {/* <Screen name="Splash" component={Splash} /> */}

      <Screen name="SignIn" component={SignIn} />

      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen name="FirstStep" component={FirstStep} />
      
      <Screen name="SignUpSecondStepSteep" component={SignUpSecondStepSteep} />

      <Screen name="CardDetails" component={CardDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="Confirmation" component={Confirmation} />

      <Screen name="SchudelingDetails" component={SchudelingDetails} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
