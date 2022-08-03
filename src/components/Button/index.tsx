import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from 'styled-components'
import { ActivityIndicator } from 'react-native'

import {
  Container,
  Title
} from "./styles";

interface Props {
  title: string
  color?: string
  onPress: () => void;
  enabled?: boolean
  loading?: boolean
}

export function Button({ onPress, title, color, enabled = false, loading = false, ...rest }: Props) {
  const theme = useTheme()

  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main}
      onPress={onPress}
      disabled={enabled}
      style={{ opacity: (enabled === true) ? .5 : 1 }}

    >
      <Title>{title}</Title>
    </Container>
  )
}