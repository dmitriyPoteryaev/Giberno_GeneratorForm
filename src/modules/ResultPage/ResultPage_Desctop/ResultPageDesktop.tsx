import React, { memo } from "react";

import CopyButton from "@shared/components/CopyButton";
import Header from "@shared/components/Header";

import "./ResultPageDesktop.css";

export type ResultPage_DescProps = {
  /** */
  blockRef?: React.MutableRefObject<HTMLDivElement>;
  /** */
  UrlToPay: string;
  /** */
  qrCodePay: string;
};

const ResultPageDesktop: React.FC<ResultPage_DescProps> = memo((props) => {
  const { blockRef, UrlToPay, qrCodePay } = props;

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
          <CopyButton className="low_block__URL_coppyButton" text={UrlToPay} />
        </div>
      </div>
    </div>
  );
});

export default ResultPageDesktop;
