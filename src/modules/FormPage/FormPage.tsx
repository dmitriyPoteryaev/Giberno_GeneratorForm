import React, { useEffect } from "react";

import "./FormPage.css";
import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader/PageLoader";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import { formStore } from "@store/index";
import { qrLinkStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

import { useChooseSelectOrInput } from "../../hooks/use-choose-select-or-input";

const FormPage = observer(() => {
  const {
    getClientTitleStore,
    ArrayWithAllInputsStore,
    ChangeArrayWithAllInputs,
    getShowWhatInputIsEmpty,
    ChageIsShowInfoHelp,
    ChageFocus,
    DeleteAllHelpers,
    ChageShowWhatInputIsEmpty,
    isLoading,
    ObjectWithInfoEmailInputStore,
    ShowList,
    itemListStore,
    Error,
    ChangeDataAboutForm,
  } = formStore;

  const { ChangeisLoadingQr_Link } = qrLinkStore;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    ChageShowWhatInputIsEmpty(false);
    ChangeisLoadingQr_Link(true);
    const curData: any = {
      key_gen: "48acf988-686f-4be4-bc36-82bf827c3b61",
    };

    location.search.split("&").forEach((line, i) => {
      curData.key_gen =
        line.split("=")[1] || "48acf988-686f-4be4-bc36-82bf827c3b61";
    });
    navigate("/formgen?key_gen=" + curData.key_gen);

    ChangeDataAboutForm(curData.key_gen);
  }, [
    navigate,
    location.search,
    ChangeDataAboutForm,
    ChageShowWhatInputIsEmpty,
    ChangeisLoadingQr_Link,
  ]);

  useEffect(() => {
    if (
      ArrayWithAllInputsStore.some(
        (elem: any) => elem.IsShowInfoHelp === true
      ) ||
      ObjectWithInfoEmailInputStore.IsShowInfoHelp ||
      ArrayWithAllInputsStore.some((elem: any) => elem.isopen === true)
    ) {
      document.addEventListener("click", DeleteAllHelpers);
    }

    return () => {
      document.removeEventListener("click", DeleteAllHelpers);
    };
  }, [
    ArrayWithAllInputsStore,
    ObjectWithInfoEmailInputStore,
    DeleteAllHelpers,
  ]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (Error) {
    return <PageError error={Error} />;
  }

  const additionalBorder =
    itemListStore?.length - 7 > 0 ? (itemListStore?.length - 7) * 50 : 0;

  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты </header>
      <form
        className="FormPageLayout__form"
        style={{
          marginBottom: itemListStore ? `${450 + additionalBorder}px` : "450px",
        }}
      >
        <div className="FormPageLayout__title">{getClientTitleStore}</div>
        {ArrayWithAllInputsStore.filter(
          (CurrentInput: any, i: any) => CurrentInput.IsEnabled
        ).map((CurrentInput: any, i: any, arr: any) => {
          const { isopen } = CurrentInput;
          const uniqKey =
            typeof isopen === "boolean" ? `select_${i}` : `input_${i}`;
          const InputOrSelectProps = {
            key: CurrentInput.placeholder,
            type: CurrentInput.type,
            name: CurrentInput.name,
            placeholder: CurrentInput.placeholder,
            value: CurrentInput.value,
            help: CurrentInput.help,
            currentNumber: i,
            IsEmpty: getShowWhatInputIsEmpty,
            IsShowInfoHelp: CurrentInput.IsShowInfoHelp,
            IsRequire: CurrentInput.IsRequire,
            onFocus: CurrentInput.onFocus,
            ChageFocus: ChageFocus,
            ChageIsShowInfoHelp: ChageIsShowInfoHelp,
            onChange: (type: any, value: any, name: any, isopen: any) => {
              if (type === "click" || typeof isopen !== "boolean") {
                ChangeArrayWithAllInputs(value, name);
              }
            },
          };

          return useChooseSelectOrInput(
            isopen,
            ShowList,
            itemListStore,
            i,
            uniqKey,
            InputOrSelectProps,
            arr
          );
        })}
      </form>
      <Footer />
    </div>
  );
});

export default FormPage;
