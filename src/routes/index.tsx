import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hook/auth'
import {AppTabRoutes} from './App.tab.route'
import {AuthRoutes} from './auth.routes'

export function Routes() {
  const {user} = useAuth()
  return (
    <NavigationContainer>
    {user.id ? <AppTabRoutes/>: <AuthRoutes/>}
    </NavigationContainer>
  )
}