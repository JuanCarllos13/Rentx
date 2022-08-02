import React from "react";
import { Accessory } from "../../components/Accesory";
import { BackButton } from "../../components/BackButton";
import { ImagemSlider } from "../../components/ImageSlider";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

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
  About,
  Acessories,
  Footer
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO
}

export function CardDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack()
  }


  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>


      <CarImagem>
        <ImagemSlider
          imagesUrl={car.photos}
        />
      </CarImagem>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} />
            ))
          }

        </Acessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>

    </Container>
  )
}

