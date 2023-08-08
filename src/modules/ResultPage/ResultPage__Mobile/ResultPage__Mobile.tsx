import React from "react";

import Button from "@shared/components/Button/Button";
import CopyButton from "@shared/components/CopyButton";
import Header from "@shared/components/Header";
import { observer } from "mobx-react-lite";

const ResultPage__Mobile = observer((props: any) => {
  const { blockRef, UrlToPay, qrCodePay } = props;
  const handlerGoToFormPay = () => {
    window.open(UrlToPay);
  };
  return (
    <div ref={blockRef} className="ResultPageLayout">
      <Header />
      <header className="ResultPageLayout__header">
        Счет успешно сформирован!
      </header>
      <div className="ResultPageLayout__UrlMobile">
        <div className="ResultPageLayout__headerMobile">
          Если оплачиваете сами:
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
          Если оплачивает клиент:
        </div>
        <img
          className="ResultPageLayout__block_imgQrMobile"
          alt="qr_code"
          src={qrCodePay}
        />
      </div>
      <span className="Sepated_block">или</span>
      <div className="ResultPageLayout__block_mobileLOWBLOCK">
        <input
          className="low_block__URL_inputUrlMobile"
          value={UrlToPay}
          onChange={() => {
            return;
          }}
        />
        <CopyButton
          className={"low_block__URL_coppyButtonMobile"}
          text={UrlToPay}
        />
      </div>
    </div>
  );
});

export default ResultPage__Mobile;
