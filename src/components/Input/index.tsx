import React, { useState } from "react";
import { Container, InputText, IconContainer } from "./styles";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Alert, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string
}

export function Input({ iconName, value,  ...rest }: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleIsFocus() {
    setIsFocused(true);

  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
        />
      </IconContainer>
      <InputText
       onFocus={handleIsFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
         {...rest} />
    </Container>
  );
}
