import { useNavigation, useIsFocused} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, StatusBar} from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Cart } from "../../components/Car";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";
import { LoadingAnimated } from "../../components/LoadingAnimeted";
import { parseISO, format } from "date-fns";
import { Cart as ModelCar } from "../../database/model/Cart";
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


interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();
  const screenIsFocus = useIsFocused()

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/rentals");
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={"light-content"}
          translucent
          backgroundColor={"transparent"}
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadingAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Cart data={item.car} />
                <CarFooter>
                  <CarFooTitle>Período</CarFooTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
