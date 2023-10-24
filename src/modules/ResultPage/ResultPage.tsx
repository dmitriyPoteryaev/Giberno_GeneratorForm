import React, { useEffect, useState, useRef } from "react";

import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader";
import { rootQrLinkStore, rootStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import ResultPageDesktop from "./ResultPage_Desctop";
import ResultPageMobile from "./ResultPageMobile";
import useFetching from "../../hooks/useFetching";
import { ObjectInputProps } from "../../types/formTypes";

import "./ResultPage.css";

let qrLinkStore: string;

let urlPayStore: string;

const ResultPage = observer(() => {
  const { postQr_Link } = rootQrLinkStore;

  const blockRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [currentWidth, setCurrentWidth] = useState<number>(
    blockRef?.current?.offsetWidth
  );

  const {
    ArrayWithAllInputsStore,
    positionTypeStore,
    employeeNameStoreForPOST,
    clientIdStore,
    keyGenStore,
    ObjectWithInfoEmailInputStore,
    itemListStore,
  } = rootStore;

  const [nameInput, descriptionInput, amountInput, discountInput] =
    ArrayWithAllInputsStore.map(
      (inputObject: ObjectInputProps) => inputObject.value
    );

  const POST_ARG = [
    employeeNameStoreForPOST,
    clientIdStore,
    keyGenStore,
    ObjectWithInfoEmailInputStore.value?.toLowerCase() || "",
    amountInput,
    nameInput,
    descriptionInput,
    positionTypeStore,
    itemListStore,
    discountInput,
  ];

  const fetch = async (
    employeeNameStoreForPOST: string,
    clientIdStore: string,
    keyGenStore: string,
    ObjectWithInfoEmailInputStoreValue: string,
    amountInput: string,
    nameInput: string,
    descriptionInput: string,
    positionTypeStore: string,
    itemListStore: any,
    discountInput: string
  ) => {
    const res = await postQr_Link(
      employeeNameStoreForPOST,
      clientIdStore,
      keyGenStore,
      ObjectWithInfoEmailInputStoreValue,
      amountInput,
      nameInput,
      descriptionInput,
      positionTypeStore,
      itemListStore,
      discountInput
    );

    if (typeof res !== "object") {
      throw Error(res);
    }

    const { urlFormPay, urlQR } = res;

    qrLinkStore = urlQR;
    urlPayStore = urlFormPay;
  };

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(fetch);

  const navigate = useNavigate();

  useEffect(() => {
    if (!positionTypeStore) {
      navigate("test/formgen");
    }
    fetching(...POST_ARG);

    const handleResize = () => {
      if (blockRef.current) {
        const width = blockRef.current.offsetWidth;
        setCurrentWidth(width);
      }
    };

    // Добавляем слушатель события resize при монтировании компонента
    window.addEventListener("resize", handleResize);

    // Выполняем обработчик события resize сразу после монтирования компонента
    handleResize();

    // Удаляем слушатель события resize при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    employeeNameStoreForPOST,
    clientIdStore,
    ArrayWithAllInputsStore,
    itemListStore,
    ObjectWithInfoEmailInputStore,
    keyGenStore,
    positionTypeStore,
    postQr_Link,
  ]);

  if (isLoading) {
    return <PageLoader description="Ожидайте, скоро появится Ваш заказ!" />;
  }
  if (error) {
    return <PageError error={error} />;
  }

  const curData: any = {
    client_id: "",
    key_form: "",
  };
  urlPayStore?.split("&")?.forEach((line: any) => {
    curData[line?.split("=")[0]?.split("?").reverse()?.[0]] =
      line?.split("=")?.[1];
  });
  const UrlToPay =
    "https://dev.qr.giberno.ru/test/formpay?client_id=" +
    curData.client_id +
    "&key_form=" +
    curData.key_form;

  const qrCodePay = "https://stage.giberno.ru:20000/" + qrLinkStore;
  if (currentWidth <= 450 && typeof currentWidth !== "undefined") {
    return (
      <ResultPageMobile
        blockRef={blockRef}
        UrlToPay={UrlToPay}
        qrCodePay={qrCodePay}
      />
    );
  }

  return (
    <ResultPageDesktop
      blockRef={blockRef}
      UrlToPay={UrlToPay}
      qrCodePay={qrCodePay}
    />
  );
});

export default ResultPage;
