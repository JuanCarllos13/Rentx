export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CardDetails: { car: {} };
      Scheduling: { car: {} };
      Confirmation: {title, message, nextScreenRoute};
      SchudelingDetails: {};
      MyCars: undefined;
      Splash: undefined;
      FirstStep: undefined;
      SignUpSecondStepSteep: {user: data};
      SignIn: undefined
    }
  }
}
