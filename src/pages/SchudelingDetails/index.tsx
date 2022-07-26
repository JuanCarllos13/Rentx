import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accesory";
import { BackButton } from "../../components/BackButton";
import { ImagemSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlataformaDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchudelingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    await api
      .post("/rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(),
        end_date: new Date(),
        total: rentTotal,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Carro Alugado",
          message: `Agora você só precisa ir${"\n"}até a concessionária da RENTX${"\n"}pegar o seu automóvel.`,
          nextScreenRoute: "Home",
        });
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Não foi possível fazer o agendamento");
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImagem>
        <ImagemSlider
          imagesUrl={
            !!car.photos
              ? car.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImagem>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {car.accessories && (
          <Accessories>
            {car.accessories.map((accessory) => (
              <Accessory
                key={accessory.name}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name={"calendar"}
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name={"chevron-right"}
            size={RFValue(19)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ </DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <ReantalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </ReantalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
}
function setCar(data: any) {
  throw new Error("Function not implemented.");
}
