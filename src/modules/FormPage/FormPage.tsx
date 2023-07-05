import React, { useEffect } from "react";

import "./FormPage.css";
import PageLoader from "@modules/PageLoader/PageLoader";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import Input from "@shared/components/Input/Input";
import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

const FormPage = observer(() => {
  const {
    ChangeDataAboutForm,
    getclientTitleStore,
    getIsLoading,
    getArrayWithAllInputs,
    ChangeArrayWithAllInputs,
    getShowWhatInputIsEmpty,
    ChageIsShowInfoHelp,
    ChageFocus,
    DeleteAllHelpers,
    getObjectWithInfoEmailInput,
  } = formStore;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const curData: any = {
      key_gen: "8fe86f19-9477-4e73-b198-d08d4e33be6c",
    };

    location.search.split("&").forEach((line, i) => {
      curData.client_id =
        line.split("=")[1] || "8fe86f19-9477-4e73-b198-d08d4e33be6c";
    });

    navigate("/formgen?key_gen=" + curData.key_gen);

    ChangeDataAboutForm(curData.key_gen);
  }, [navigate, location.search, ChangeDataAboutForm]);

  useEffect(() => {
    if (
      getArrayWithAllInputs?.some(
        (elem: any) => elem?.IsShowInfoHelp === true
      ) ||
      getObjectWithInfoEmailInput?.IsShowInfoHelp
    ) {
      document.addEventListener("click", DeleteAllHelpers);
    }

    return () => {
      document?.removeEventListener("click", DeleteAllHelpers);
    };
  }, [getArrayWithAllInputs, getObjectWithInfoEmailInput]);

  if (getIsLoading) {
    return <PageLoader />;
  }

  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты </header>
      <form className="FormPageLayout__form">
        <div className="FormPageLayout__title">{getclientTitleStore}</div>
        {getArrayWithAllInputs?.map((CurrentInput: any, i: any) => (
          <Input
            key={i}
            type={CurrentInput?.type}
            placeholder={CurrentInput?.placeholder}
            value={CurrentInput?.value}
            help={CurrentInput?.help}
            currentNumber={i}
            IsShowInfoHelp={CurrentInput.IsShowInfoHelp}
            getShowWhatInputIsEmpty={getShowWhatInputIsEmpty}
            onFocus={CurrentInput?.onFocus}
            ChageFocus={ChageFocus}
            getArrayWithAllInputs={getArrayWithAllInputs}
            ChageIsShowInfoHelp={ChageIsShowInfoHelp}
            onChange={(event: any) => ChangeArrayWithAllInputs(event, i)}
          />
        ))}
      </form>
      <Footer />
    </div>
  );
});

export default FormPage;
