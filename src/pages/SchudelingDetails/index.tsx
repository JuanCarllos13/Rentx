import React from "react";
import { Accessory } from "../../components/Accesory";
import { BackButton } from "../../components/BackButton";
import { ImagemSlider } from "../../components/ImageSlider";
import Speeding from '../../assets/speed.svg'
import AccelerationSVG from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import {
  Container,
  Header,
  CarImagem,
  Content,
  Details,
  Brand,
  Name,
  Description,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  ReantalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

export function SchudelingDetails() {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>


      <CarImagem>
        <ImagemSlider
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CarImagem>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name='380km/h' icon={Speeding} />
          <Accessory name='3.2s' icon={AccelerationSVG} />
          <Accessory name='800 HP' icon={ForceSvg} />
          <Accessory name='Gasolina' icon={GasolineSvg} />
          <Accessory name='Auto' icon={ExchangeSvg} />
          <Accessory name='2 pessoas' icon={PeopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name={'calendar'}
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name={'chevron-right'}
            size={RFValue(19)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <ReantalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diarios</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </ReantalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button title='Alugar agora' onPress={handleConfirmRental} color={theme.colors.success}/>
      </Footer>

    </Container>
  )
}

