import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accesory";
import { BackButton } from "../../components/BackButton";
import { ImagemSlider } from "../../components/ImageSlider";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { useTheme } from 'styled-components'
import {Cart} from '../../dataBase/model/Cart'
import Animated,
{
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from "react-native-reanimated";

import {
  Container,
  Header,
  CarImagem,
  Details,
  Brand,
  Name,
  Description,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
  OfflineInfo
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar, StyleSheet } from "react-native";
import { api } from "../../services/api";
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
  carId: string;
}


export function CardDetails() {
  const [car, setCar] = useState<CarDTO>({} as CarDTO);
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { carId } = route.params as Params;
  const scrollY = useSharedValue(0)
  const netInfo = useNetInfo();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStylesAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })


  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  function handleBack() {
    navigation.goBack()
  }

  
  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${carId}`);
      setCar(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchOnlineData();
    }
  }, [netInfo.isConnected])


  return (
    <Container>
    <StatusBar
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
    />

    <Animated.View
      style={[
        headerStyleAnimation,
        styles.header,
        { backgroundColor: theme.colors.background_secondary }
      ]}
    >
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <Animated.View style={sliderCarsStylesAnimation}>
        <CarImagem>
          <ImagemSlider
            imagesUrl={
              !!car.photos ?
                car.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </CarImagem>
      </Animated.View>
    </Animated.View>

    <Animated.ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 160,
      }}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <Details>
        <Description>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
        </Description>

        <Rent>
          <Period>{car.period}</Period>
          <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
        </Rent>
      </Details>

      {
        car.accessories &&
        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.id}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Acessories>
      }

      <About>
        {car.about}
      </About>

    </Animated.ScrollView>

    <Footer>
      <Button
        title="Escolher período do aluguel"
        onPress={handleConfirmRental}
        enabled={netInfo.isConnected ===  true}
        
      />

      {
        netInfo.isConnected === false &&
        <OfflineInfo>
          Conecte-se a internet para ver mais detalhes e agendar seu carro.
        </OfflineInfo>
      }
    </Footer>
  </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    marginTop: 14
  }
})

