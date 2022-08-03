import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderContent,
  TotalCard,
  CardList,
  MyCarsButton,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Loading";
import { useTheme } from "styled-components";

export function Home() {
  const theme = useTheme()
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CardDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }


  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCard>Total de 12 carros</TotalCard>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cart data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
         name="ios-car-sport" 
        size={32} 
        color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}
