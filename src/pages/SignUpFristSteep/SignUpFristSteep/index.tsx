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
import { useNavigation } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import * as Yup from "yup";

export function FirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnh, setCnh] = useState("");
  const navigate = useNavigation();
  function handleBack() {
    navigate.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        cnh: Yup.string().required("CNH é obrigatório"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        name: Yup.string().required("Nome obrigatório"),
      });

      const data = {name, email, cnh}
      await schema.validate(data)

      navigate.navigate("SignUpSecondStepSteep", {user : data});
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        return Alert.alert('opa', error.message)
      }

    }
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize='none'
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              // onChangeText={(value) => setCnh(Number(value))}
              onChangeText={setCnh}
              value={cnh}
            />
          </Form>
          <Button onPress={handleNextStep} title="Confirmar" />
        
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
