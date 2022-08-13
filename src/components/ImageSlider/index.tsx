import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

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

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImagemSlider({ imagesUrl }: Props) {
  const [imagemIndex, setImagemIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImagemIndex(index)
  })

  return (
    <Container>
      <ImageIndexs>
        {
          imagesUrl.map((item, index) => (
            <ImagemIndex
              key={String(index)}
              active={index === imagemIndex} />
          ))
        }
      </ImageIndexs>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CardImagemWrapper>
            <CardImagem
              source={{ uri: item }}
              resizeMode='contain'
            />
          </CardImagemWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}