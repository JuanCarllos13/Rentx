import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FlatList, FlatListProps } from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import {Cart} from '../../dataBase/model/Cart'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
    width: 100%;
    height: 123px;

    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;

    padding: 32px 24px;
`

export const HeaderContent = styled.View`
    flex-direction: row;
   align-items: flex-end;
    justify-content: space-between;


`

export const TotalCard = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color:  ${({ theme }) => theme.colors.text};;
`
export const CardList = styled(FlatList as new (props: FlatListProps<Cart>) => FlatList<Cart>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showVerticalScrollIndicator: false
})`
`

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.main};
    justify-content: center;
    align-items: center;
    border-radius: 30px;

    position: absolute;
    bottom: 13px;
    right: 22px;
`