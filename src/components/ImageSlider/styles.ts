import styled from "styled-components/native";
import { Dimensions } from 'react-native'

export const Container = styled.View`
  width: 100%;
`

export const ImageIndexs = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`
export const CardImagemWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`

export const CardImagem = styled.Image`
  width: 280px;
  height: 132px;
`
