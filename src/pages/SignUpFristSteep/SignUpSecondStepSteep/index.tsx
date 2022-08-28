import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    cnh: string;
  };
}

export function SignUpSecondStepSteep() {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigate.goBack();
  }

  async function handleRegister() {
    if (!password || !ConfirmPassword) {
      return Alert.alert("Informe a senha e confirme");
    }

    if (password != ConfirmPassword) {
      return Alert.alert("As senhas devem ser iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.cnh,
        password,
      })
      .then(() => {
        navigate.navigate("Confirmation", {
          title: "Conta Criada",
          message: `Agora é só fazer login${"\n"} e aproveitar`,
          nextScreenRoute: "SignIn",
        });
      })
      .catch((err) => {
        console.log('Error', err)
        Alert.alert("Não foi possível cadastrar");
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápido e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senhas</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
              onChangeText={setConfirmPassword}
              value={ConfirmPassword}
            />
          </Form>

          <Button
            onPress={handleRegister}
            title="Confirmar"
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
