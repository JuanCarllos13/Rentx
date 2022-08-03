import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { format } from 'date-fns'
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
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DateData } from 'react-native-calendars'
import { getPlatformDate } from "../../utils/getPlataformaDate";
import { CarDTO } from "../../dtos/CarDTO";


interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: CarDTO
}

export function Scheduling() {
  const theme = useTheme()
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const navigation = useNavigation()
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const route = useRoute()
  const { car } = route.params as Params

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
      navigation.navigate('SchudelingDetails', {
        car,
        dates: Object.keys(markedDates)
    })
  }


  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }
    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyy')
    })
  }

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

        <RentalPeriod>
          <DataInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
              </DateValue>
          </DataInfo>

          <ArrowSvg />

          <DataInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
              </DateValue>
          </DataInfo>

        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!!rentalPeriod.endFormatted}
        />
      </Footer>

    </Container>
  )
}