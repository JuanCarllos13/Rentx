import React from "react";
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CardImage,
} from "./styles";

import GasolineSvg from '../../assets/gasoline.svg'
import { TouchableOpacityProps } from "react-native";

interface Props {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number
  }
  thumbnail: string
}

interface Data extends TouchableOpacityProps {
  data: Props
}

export function Cart({ data, ...rest}: Data) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>



      <CardImage source={{ uri: data.thumbnail }} resizeMode='contain' />


    </Container>
  )
}