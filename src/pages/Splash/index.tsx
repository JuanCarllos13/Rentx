import React, { useEffect } from "react";
import { Button, StyleSheet, Dimensions } from 'react-native'
import { Container } from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolation,
  runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const splashAnimation = useSharedValue(0)
  const navigation = useNavigation()


  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50],
        [1, .3, 0],
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [1, 0],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50],
        [0, .3, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  function startApp() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50,
      { duration: 2000 },
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    )
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  )

}
