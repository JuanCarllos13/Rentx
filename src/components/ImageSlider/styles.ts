import styled from "styled-components/native";
import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

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

export const CardImagem = styled(FastImage)`
  width: 280px;
  height: 132px;
`
