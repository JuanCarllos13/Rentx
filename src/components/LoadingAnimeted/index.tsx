import React from "react";
import { Container } from "./styles";
import LottieView from 'lottie-react-native';
import LoadingCar from '../../assets/loading_car.json'

export function LoadingAnimated(){
  return(
    <Container>
      <LottieView
        source={LoadingCar}
        autoPlay
        style={{height: 200}}
        resizeMode='contain'
        loop
      />
    </Container>
  )
}