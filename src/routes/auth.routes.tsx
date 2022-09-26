import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Confirmation } from "../pages/Confirmation";
import { Splash } from "../pages/Splash";
import { SignIn } from "../pages/SignIn";
import { FirstStep } from "../pages/SignUpFristSteep/SignUpFristSteep";
import { SignUpSecondStepSteep } from "../pages/SignUpFristSteep/SignUpSecondStepSteep";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />

      <Screen name="SignIn" component={SignIn} />

      <Screen name="FirstStep" component={FirstStep} />

      <Screen name="SignUpSecondStepSteep" component={SignUpSecondStepSteep} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
