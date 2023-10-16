import React, { useEffect, useState, useRef } from "react";

import useFetching from "@hooks/useFetching";
import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader";
import CopyButton from "@shared/components/CopyButton";
import Header from "@shared/components/Header";
import { rootQrLinkStore, rootStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

import ResultPage__Mobile from "./ResultPage__Mobile";
import { ObjectInputProps } from "../../types/formTypes";

import "./ResultPage.css";

const ResultPage = observer(() => {
  const { postQr_Link, qrLinkStore, urlFormPayStore } = rootQrLinkStore;

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(postQr_Link);
  const blockRef = useRef<any>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(
    blockRef.current?.offsetWidth
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!positionTypeStore) {
      navigate("test/formgen");
    }
    fetching(
      employeeNameStoreForPOST,
      clientIdStore,
      keyGenStore,
      ObjectWithInfoEmailInputStore.value?.toLowerCase() || "",
      amountInput,
      nameInput,
      descriptionInput,
      positionTypeStore,
      itemListStore,
      discountInput
    );

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
    return <PageLoader description={"Ожидайте, скоро появится Ваш заказ!"} />;
  }
  if (error) {
    return <PageError error={error} />;
  }

  const curData: any = {
    client_id: "",
    key_form: "",
  };
  urlFormPayStore?.split("&")?.forEach((line: any, i: any) => {
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
      <ResultPage__Mobile
        blockRef={blockRef}
        UrlToPay={UrlToPay}
        qrCodePay={qrCodePay}
      />
    );
  }

  return (
    <div ref={blockRef} className="ResultPageLayout">
      <Header />
      <header className="ResultPageLayout__header">
        Счет успешно сформирован!
      </header>
      <section className="ResultPageLayout__block">
        <img
          className="ResultPageLayout__block_imgQr"
          alt="qr_code"
          src={qrCodePay}
        />
        <div className="ResultPageLayout__block_desc">
          1. Откройте на смартфоне приложение для сканирования QR-кода. <br />
          2. Наведите камеру на QR-код. <br />
          3. Должна появиться ссылка для перехода. Перейдите по ней.
          <br />
          4. Проверьте сумму оплаты и ID договора.
          <br />
          5. Нажмите на кнопку “Оплатить”.
          <br />
          6. Выберите банковское приложение для оплаты.
          <br />
          7. Вас “перебросит” выбранный банк. <br />
          Подтвердите оплату.
        </div>
      </section>
      <span className="Sepated_block">или</span>
      <div className="low_block">
        <div className="low_block_desctoLinr">
          Скопируйте ссылку ниже, перешлите её клиенту или себе на смартфон.
          Далее перейдите по ссылке в любом из браузеров.
        </div>
        <div className="low_block__URL">
          <input
            className="low_block__URL_inputUrl"
            value={UrlToPay}
            onChange={() => {
              return;
            }}
          />
          <CopyButton
            className={"low_block__URL_coppyButton"}
            text={UrlToPay}
          />
        </div>
      </div>
    </div>
  );
});

export default ResultPage;
