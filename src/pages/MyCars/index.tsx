import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Cart } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { AntDesign } from '@expo/vector-icons'
import { LoadingAnimated } from '../../components/LoadingAnimeted'
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface CarProps {
  car: CarDTO;
  user_id: string;
  id: string
  startDate: string;
  endDate: string
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const theme = useTheme()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (err) {
        console.log(err)

      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>

      {loading ? <LoadingAnimated /> : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Cart data={item.car} />
                <CarFooter>
                  <CarFooTitle>Período</CarFooTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>

            )}

          />

        </Content>
      )}

    </Container>
  )
}
