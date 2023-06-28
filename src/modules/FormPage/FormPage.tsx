import React, { useState } from "react";

import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import Input from "@shared/components/Input/Input";
import styled from "styled-components";

const FormPageLayout = styled.footer`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const FormPageLayout__header = styled.div`
  color: #2c555b;
  font-size: 20px;
  margin: 20px 0 20px 0;
`;

const FormPageLayout__form = styled.form`
  width: 80%;
`;

const FormPageLayout__input = styled.input`
  border-radius: 5px;
  border: 1px solid gray;
  width: 400px;
  height: 50px;
  color: #b2bdc7;
  font-size: 20px;
  padding-left: 15px;
`;

{
  /* <form action="handler.php">
<p><b>Как по вашему мнению расшифровывается аббревиатура &quot;ОС&quot;?</b></p>
<p><input type="radio" name="answer" value="a1">Офицерский состав<Br>
<input type="radio" name="answer" value="a2">Операционная система<Br>
<input type="radio" name="answer" value="a3">Большой полосатый мух</p>
<p><input type="submit"></p>
</form> */
}

const FormPage = () => {
  const [ObjectWthAllInputs, setObjectWthAllInputs] = useState({
    typePolis: "",
    id: "",
    amount: "",
  });

  console.log(ObjectWthAllInputs);
  return (
    <FormPageLayout>
      <Header />
      <FormPageLayout__header>Формирование оплаты </FormPageLayout__header>
      <FormPageLayout__form>
        <Input
          InputClass={FormPageLayout__input}
          type="email"
          placeholder={"Тип полиса"}
          value={ObjectWthAllInputs.typePolis}
          onChange={(event: any) => {
            setObjectWthAllInputs((prevState) => ({
              ...prevState,
              typePolis: event,
            }));
          }}
        />
        <Input
          InputClass={FormPageLayout__input}
          type="text"
          placeholder={"ID договора"}
          value={ObjectWthAllInputs.id}
          onChange={(event: any) => {
            setObjectWthAllInputs((prevState) => ({
              ...prevState,
              id: event,
            }));
          }}
        />
        <Input
          InputClass={FormPageLayout__input}
          type="text"
          placeholder={"Сумма"}
          value={ObjectWthAllInputs.amount}
          onChange={(event: any) => {
            setObjectWthAllInputs((prevState) => ({
              ...prevState,
              amount: event,
            }));
          }}
        />
      </FormPageLayout__form>
      <Footer />
    </FormPageLayout>
  );
};

export default FormPage;
