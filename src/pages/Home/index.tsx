import React from "react";
import {
  Container,
  Header,
  HeaderContent,
  TotalCard,
  CardList
} from "./styles";
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { Cart } from '../../components/Car'
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation()

  const cardData = {
    brand: 'audi',
    name: 'RS 5 Coupe',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
  }

  function handleCarDetails(){
    navigation.navigate('CardDetails')
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCard>
            Total de 12 carros
          </TotalCard>
        </HeaderContent>


      </Header>
      <CardList
        data={[1, 2, 3]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Cart data={cardData} onPress={handleCarDetails} />}
      />


    </Container>
  )
}