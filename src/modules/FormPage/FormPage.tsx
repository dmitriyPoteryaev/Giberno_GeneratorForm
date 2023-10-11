import React, { useEffect, useState, useRef, useCallback } from "react";

import "./FormPage.css";

import useFetching from "@hooks/useFetching";
import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader/PageLoader";
import Footer from "@shared/components/Footer";
import Form from "@shared/components/Form";
import Header from "@shared/components/Header";
import { rootStore } from "@store/index";
import { checkValidMail } from "@utils/checkValidMail";
import { ResultIsGeneralButtonDisabled } from "@utils/ResultIsGeneralButtonDisabled";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ObjectInputProps, itemFromList } from "../../types/formTypes";

let FormInputsStore: ObjectInputProps[] = [];
let itemListStore: itemFromList[] = [];
let positionTypeStore: string;
let EmailInputStore: any;
let keyGenStore: string;
let clientTitleStore: string;

const FormPage: React.FC = observer(() => {
  const { ChangeArrayWithAllInputs, ChangeDataAboutForm, ChangeObjEmail } =
    rootStore;

  const [isRed, setIsRed] = useState(false);

  const fetch = async (key_gen: string) => {
    const res = await ChangeDataAboutForm(key_gen);

    if (typeof res !== "object") {
      throw Error(res);
    }

    const {
      ArrayWithFormInputs,
      ObjectWithInfoEmailInput,
      keyGen,
      positionType,
      itemList,
      clientTitle,
    } = res;

    FormInputsStore = ArrayWithFormInputs;
    itemListStore = itemList;
    positionTypeStore = positionType;
    EmailInputStore = ObjectWithInfoEmailInput;
    keyGenStore = keyGen;
    clientTitleStore = clientTitle;
  };
  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(fetch);

  const location = useLocation();

  useEffect(() => {
    let key_gen = "48acf988-686f-4be4-bc36-82bf827c3b61";

    location.search.split("&").forEach((line, i) => {
      key_gen = line.split("=")[1] || "48acf988-686f-4be4-bc36-82bf827c3b61";
    });

    fetching(key_gen);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeGlobalStateInputsForm = useCallback((value: any) => {
    FormInputsStore = value;
    ChangeArrayWithAllInputs(value);
  }, []);

  const changeGlobalStateEmailInput = useCallback((value: any) => {
    EmailInputStore = value;
    ChangeObjEmail(value);
  }, []);

  const navigate = useNavigate();

  const handlerPostQuery = useCallback(() => {
    if (
      !ResultIsGeneralButtonDisabled(FormInputsStore, EmailInputStore) &&
      checkValidMail(EmailInputStore.IsRequire, EmailInputStore.value)
    ) {
      navigate("/test/result?key_gen=" + keyGenStore);
    }
    setIsRed(true);
  }, []);
  if (isLoading) {
    return <PageLoader description="Ожидайте, скоро появится Ваш заказ!" />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты</header>
      <Form
        FormInputsStore={FormInputsStore}
        changeGlobalStateInputsForm={changeGlobalStateInputsForm}
        itemListStore={itemListStore}
        positionTypeStore={positionTypeStore}
        isRedBorder={isRed}
        clientTitleStore={clientTitleStore}
      />
      <Footer
        EmailInputStore={EmailInputStore}
        isRedBorder={isRed}
        changeGlobalStateEmailInput={changeGlobalStateEmailInput}
        handlerPostQuery={handlerPostQuery}
      />
    </div>
  );
});

export default FormPage;
