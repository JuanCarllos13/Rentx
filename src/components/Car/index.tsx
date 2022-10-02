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

import { TouchableOpacityProps } from "react-native";
import { Cart as ModelCar } from '../../dataBase/model/Cart'
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from '../../dtos/CarDTO';

interface Data extends TouchableOpacityProps {
  data: CarDTO
}

export function Cart({ data, ...rest }: Data) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>



      <CardImage source={{ uri: data.thumbnail }} resizeMode='contain' />


    </Container>
  )
}