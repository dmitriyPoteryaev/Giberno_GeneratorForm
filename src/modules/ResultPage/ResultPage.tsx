import React, { useEffect } from "react";

import FormPage from "@modules/FormPage";
import PageLoader from "@modules/PageLoader";
import Header from "@shared/components/Header";
import { formStore, qrLinkStore } from "@store/index";
import { observer } from "mobx-react-lite";
import "./ResultPage.css";

const ResultPage = observer(() => {
  const { postQr_Link, getIsLoadingQr_Link, getqrLinkStore, urlFormPayStore } =
    qrLinkStore;
  const {
    getObjectWithInfoEmailInput,
    getemployeeNameStore,
    getclientId,
    getkeyGenStore,
    getArrayWithAllInputs,
    getIsLoading,
  } = formStore;

  if (getIsLoading) {
    return <FormPage />;
  }
  useEffect(() => {
    if (getIsLoadingQr_Link) {
      postQr_Link(
        getemployeeNameStore,
        getclientId,
        getkeyGenStore,
        getObjectWithInfoEmailInput.value,
        getArrayWithAllInputs[2].value,
        getArrayWithAllInputs[0].value,
        getArrayWithAllInputs[1].value
      );
    }
  }, [getIsLoadingQr_Link]);

  if (getIsLoadingQr_Link) {
    return <PageLoader />;
  }

  return (
    <div className="ResultPageLayout">
      <Header />
      <header className="ResultPageLayout__header">
        Счет успешно сформирован!
      </header>
      <section className="ResultPageLayout__block">
        <img
          className="ResultPageLayout__block_imgQr"
          alt="qr_code"
          src={getqrLinkStore}
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
      <div className="low_block">
        <div className="ResultPageLayout__block_desctoLinr">
          Скопируйте ссылку ниже, перешлите её клиенту или себе на смартфон.
          Далее перейдите по ссылке в любом из браузеров.
        </div>
        <input
          className="ResultPageLayout__block_inputUrl"
          value={urlFormPayStore}
        />
      </div>
    </div>
  );
});

export default ResultPage;
