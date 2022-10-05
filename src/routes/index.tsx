import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/auth";
import { AppTabRoutes } from "./App.tab.route";
import { AuthRoutes } from "./auth.routes";
import { LoadingAnimated } from "../components/LoadingAnimeted";

export function Routes() {
  const { user, loading } = useAuth();
  return loading ? (
    <LoadingAnimated />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
