import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";

import {
  Container,
  ImageIndexs,
  CardImagemWrapper,
  CardImagem,
} from "./styles";

interface Props {
  imagesUrl: {
    photo: string;
    id: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImagemSlider({ imagesUrl }: Props) {
  const [imagemIndex, setImagemIndex] = useState(0);
  const navigation = useNavigation();

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImagemIndex(index);
  });



  return (
    <Container>
      <ImageIndexs>
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imagemIndex} />
        ))}
      </ImageIndexs>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardImagemWrapper>
            <CardImagem source={{ uri: item.photo }} resizeMode="contain" />
          </CardImagemWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
