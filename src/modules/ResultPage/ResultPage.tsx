import React, { useEffect, useState, useRef } from "react";

import FormPage from "@modules/FormPage";
import PageLoader from "@modules/PageLoader";
import Button from "@shared/components/Button";
import CopyButton from "@shared/components/CopyButton";
import Header from "@shared/components/Header";
import { formStore, qrLinkStore } from "@store/index";
import { observer } from "mobx-react-lite";
import "./ResultPage.css";

const ResultPage = observer(() => {
  const blockRef = useRef<any>(null);
  const [currentWidth, setCurrentWidth] = useState<any>(
    blockRef.current?.offsetWidth
  );
  const { postQr_Link, getIsLoadingQr_Link, getqrLinkStore, urlFormPayStore } =
    qrLinkStore;
  const {
    getObjectWithInfoEmailInput,
    getclientId,
    getkeyGenStore,
    getArrayWithAllInputs,
    getIsLoading,
    getemployeeNameStoreForPOST,
    ChageShowWhatInputIsEmpty,
  } = formStore;

  if (getIsLoading) {
    return <FormPage />;
  }
  useEffect(() => {
    if (getIsLoadingQr_Link) {
      ChageShowWhatInputIsEmpty(false);
      postQr_Link(
        getemployeeNameStoreForPOST,
        getclientId,
        getkeyGenStore,
        getObjectWithInfoEmailInput.value?.toLowerCase(),
        getArrayWithAllInputs[2].value,
        getArrayWithAllInputs[0].value,
        getArrayWithAllInputs[1].value
      );
    }
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
  }, [getIsLoadingQr_Link]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (blockRef.current) {
  //       const width = blockRef.current.offsetWidth;
  //       setCurrentWidth(width);
  //     }
  //   };

  //   // Добавляем слушатель события resize при монтировании компонента
  //   window.addEventListener("resize", handleResize);

  //   // Выполняем обработчик события resize сразу после монтирования компонента
  //   handleResize();

  //   // Удаляем слушатель события resize при размонтировании компонента
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [currentWidth]);

  const handlerGoToFormPay = () => {
    window.open(urlFormPayStore);
  };

  if (getIsLoadingQr_Link) {
    return <PageLoader />;
  }

  if (currentWidth <= 450 && typeof currentWidth !== "undefined") {
    return (
      <div ref={blockRef} className="ResultPageLayout">
        <Header />
        <header className="ResultPageLayout__header">
          Счет успешно сформирован!
        </header>
        <div className="ResultPageLayout__UrlMobile">
          <div className="ResultPageLayout__headerMobile">
            Если оплачиваете сами
          </div>
          <Button
            ButtonClass={"ResultPageLayout__buttonMobile"}
            disabled={false}
            onClick={handlerGoToFormPay}
          >
            Перейти на форму оплаты
          </Button>
        </div>
        <div className="ResultPageLayout__UrlMobile_low">
          <div className="ResultPageLayout__headerMobile">
            Если оплачивает клиент
          </div>
          <img
            className="ResultPageLayout__block_imgQrMobile"
            alt="qr_code"
            src={
              getqrLinkStore ? "https://api.giberno.ru/" + getqrLinkStore : ""
            }
          />
        </div>
      </div>
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
          src={getqrLinkStore ? "https://api.giberno.ru/" + getqrLinkStore : ""}
        />
        <div className="ResultPageLayout__block_desc">
          1.Откройте на смартфоне приложение для сканирования QR-кода. <br />
          2.Наведите камеру на QR-код. <br />
          3.Должна появиться ссылка для перехода. Перейдите по ней.
          <br />
          4.Проверьте сумму оплаты и ID договора.
          <br />
          6.Нажмите на кнопку “Оплатить”.
          <br />
          7.Выберите банковское приложение для оплаты.
          <br />
          8.Вас “перебросит” выбранный банк. <br />
          Подтвердите оплату.
        </div>
      </section>
      <span>или</span>
      <div className="low_block">
        <div className="low_block_desctoLinr">
          Скопируйте ссылку ниже, перешлите её клиенту или себе на смартфон.
          Далее перейдите по ссылке в любом из браузеров.
        </div>
        <div className="low_block__URL">
          <input
            className="low_block__URL_inputUrl"
            value={urlFormPayStore}
            onChange={() => {
              return;
            }}
          />
          <CopyButton
            className={"low_block__URL_coppyButton"}
            text={urlFormPayStore}
          />
        </div>
      </div>
    </div>
  );
});

export default ResultPage;
