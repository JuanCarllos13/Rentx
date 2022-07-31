import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home'
import { CardDetails } from '../pages/CardDetails'
import { Scheduling } from '../pages/Scheduling'
import { SchedulingComplete } from '../pages/SchedulingComplete'
import { SchudelingDetails } from '../pages/SchudelingDetails'


const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Navigator  screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={Home}
      />

      <Screen
        name="CardDetails"
        component={CardDetails}
      />

      <Screen
        name="Scheduling"
        component={Scheduling}
      />

      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
      />

      <Screen
        name="SchudelingDetails"
        component={SchudelingDetails}
      />
    </Navigator>
  )
}