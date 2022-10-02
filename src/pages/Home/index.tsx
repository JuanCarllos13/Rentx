import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderContent,
  TotalCard,
  CardList,
} from "./styles";
import { StatusBar, StyleSheet } from "react-native";
import Logo from "../../assets/logo.svg";
import { useNetInfo } from "@react-native-community/netinfo";
import { RFValue } from "react-native-responsive-fontsize";
import { Cart } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../dataBase";
import { Cart as ModelCar } from "../../dataBase/model/Cart";
import { CarDTO } from '../../dtos/CarDTO';

import { LoadingAnimated } from "../../components/LoadingAnimeted";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  async function offlineSynchronize() {
    // sincroniza com o banco
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CardDetails', { carId: car.id })
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch(); // Buscar todos os carros
        if (isMounted) {
          setCars(cars);
        }
      } catch (err) {
        console.log("Err", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize;
    }
  }, [netInfo.isConnected]);

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

          <TotalCard>Total de {cars.length} carros</TotalCard>
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadingAnimated />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cart data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
