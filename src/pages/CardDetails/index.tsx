import React from "react";
import { Accessory } from "../../components/Accesory";
import { BackButton } from "../../components/BackButton";
import { ImagemSlider } from "../../components/ImageSlider";
import Speeding from '../../assets/speed.svg'
import AccelerationSVG from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

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
  About,
  Acessories,
  Footer
} from "./styles";
import { Button } from "../../components/Button";

export function CardDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>


      <CarImagem>
        <ImagemSlider
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CarImagem>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory name='380km/h' icon={Speeding} />
          <Accessory name='3.2s' icon={AccelerationSVG} />
          <Accessory name='800 HP' icon={ForceSvg} />
          <Accessory name='Gasolina' icon={GasolineSvg} />
          <Accessory name='Auto' icon={ExchangeSvg} />
          <Accessory name='2 pessoas' icon={PeopleSvg} />
        </Acessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={() => {}}/>
      </Footer>

    </Container>
  )
}

