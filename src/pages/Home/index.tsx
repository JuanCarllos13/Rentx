import React, { useEffect, useState } from "react";
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
import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { Load } from '../../components/Loading'

export function Home() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()


  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CardDetails', {car})
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (err) {

      } finally {
        setLoading(false)
      }
    }
    fetchCars()

  }, [])

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
      {loading ? <Load /> :
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Cart data={item} onPress={() => handleCarDetails(item)} />}
        />
      }




    </Container>
  )
}