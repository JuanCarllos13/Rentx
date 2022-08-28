import React from "react";
import { useWindowDimensions } from 'react-native'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { 
  Container,
  Content,
  Title,
  Message,
  Footer
 } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton/indext";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string
}

interface Navigation {
  navigate: (value: string) => void;
}

export function Confirmation() {
  const { width } = useWindowDimensions()
  const route = useRoute();
  const navigation = useNavigation<Navigation>();  
  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleConfirm}/>
      </Footer>

    </Container>
  )
}