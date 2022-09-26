import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderContent,
  TotalCard,
  CardList,
  MyCarsButton,
} from "./styles";
// import { Ionicons } from "@expo/vector-icons";
import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
// import { Load } from "../../components/Loading";
import { LoadingAnimated } from "../../components/LoadingAnimeted";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

// import {
//   RectButton,
//   PanGestureHandler,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

// const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  // const positionY = useSharedValue(0);
  // const positionX = useSharedValue(0);

  // const myCarsButtonStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ],
  //   };
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     (positionX.value = ctx.positionX + event.translationX),
  //       (positionY.value = ctx.positionY + event.translationY);
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   },
  // });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CardDetails", { car });
  }

  // function handleOpenMyCars() {
  //   navigation.navigate("MyCars");
  // }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if(isMounted){
          setCars(response.data);
        }
      } catch (err) {
        console.log("Err", err);
      } finally {
        if(isMounted){
          setLoading(false);
        }    
      }
    }
    fetchCars();
    return () => {
      isMounted = false
    }
  }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // });

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCard>Total de {cars.length} carros</TotalCard>
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadingAnimated />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cart data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
{/* 
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyles,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
