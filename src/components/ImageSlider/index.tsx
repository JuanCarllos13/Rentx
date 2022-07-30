import React from "react";

import {
  Container,
  ImageIndexs,
  ImagemIndex,
  CardImagemWrapper,
  CardImagem,
} from './styles'

interface Props {
  imagesUrl: string[]
}


export function ImagemSlider({imagesUrl}: Props) {
  return (
    <Container>
      <ImageIndexs>
        <ImagemIndex active={true} />
        <ImagemIndex active={false} />
        <ImagemIndex active={false} />
        <ImagemIndex active={false} />
      </ImageIndexs>

      <CardImagemWrapper>
        <CardImagem
        source={{uri: imagesUrl[0]}}
        resizeMode='contain'
        />
      </CardImagemWrapper>
    </Container>



  )
}