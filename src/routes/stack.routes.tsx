import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/Home";
import { CardDetails } from "../pages/CardDetails";
import { Scheduling } from "../pages/Scheduling";
import { SchedulingComplete } from "../pages/SchedulingComplete";
import { SchudelingDetails } from "../pages/SchudelingDetails";
import { MyCars } from "../pages/MyCars";
import { Splash } from "../pages/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Screen name="Splash" component={Splash} />

      <Screen name="Home" 
      component={Home}
      options={{
        gestureEnabled: false
      }}
       />

      <Screen name="CardDetails" component={CardDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingComplete" component={SchedulingComplete} />

      <Screen name="SchudelingDetails" component={SchudelingDetails} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
