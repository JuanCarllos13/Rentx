import React from "react";
import { BackButton } from "../../components/BackButton";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DataInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from "./styles";
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

export function Scheduling() {
  const theme = useTheme()
  return (
    <Container>
      <Header>
        <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
        />
        <BackButton onPress={() => { }} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DataInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={false}>18/07/2021</DateValue>
          </DataInfo>

          <ArrowSvg />

          <DataInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/07/2021</DateValue>
          </DataInfo>

        </RentalPeriod>
      </Header>

      <Content>
      <Calendar/>
      </Content>

      <Footer>
        <Button
        title="Confirmar"
        onPress={() => {}}
        />
      </Footer>

    </Container>
  )
}