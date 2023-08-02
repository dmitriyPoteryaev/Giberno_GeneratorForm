import React, { useEffect } from "react";

import "./FormPage.css";
import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader/PageLoader";
import CustomSelect from "@shared/components/CustomSelect/CustomSelect";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import Input from "@shared/components/Input/Input";
import { formStore } from "@store/index";
import { qrLinkStore } from "@store/index";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

const FormPage = observer(() => {
  const {
    clientTitleStore,
    ArrayWithAllInputsStore,
    ChangeArrayWithAllInputs,
    getShowWhatInputIsEmpty,
    ChageIsShowInfoHelp,
    ChageFocus,
    DeleteAllHelpers,
    ChageShowWhatInputIsEmpty,
    isLoading,
    ChangeDataAboutForm,
    ObjectWithInfoEmailInputStore,
    ShowList,
    itemListStore,
    Error,
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
    navigate("/test/formgen?key_gen=" + curData.key_gen);

    ChangeDataAboutForm(curData.key_gen);
  }, [
    navigate,
    location.search,
    ChangeDataAboutForm,
    ChageShowWhatInputIsEmpty,
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
        <div className="FormPageLayout__title">{clientTitleStore}</div>
        {ArrayWithAllInputsStore.filter(
          (CurrentInput: any, i: any) => CurrentInput.IsEnabled
        ).map((CurrentInput: any, i: any, arr: any) => {
          const uniqKey =
            typeof CurrentInput.isopen === "boolean"
              ? `select_${i}`
              : `input_${i}`;
          const InputProps = {
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

          if (i === 0) {
            const Props_First = {
              uniqKey: uniqKey,
              ...InputProps,
            };
            if (CurrentInput.isopen === null) {
              const InputProps_First = {
                className: "Formpagelayout__input_first",
                ...Props_First,
              };
              return <Input {...InputProps_First} />;
            } else {
              const CustomSelectProps = {
                ShowList: ShowList,
                actualPositionsStore: MapArrayItemsBySpecificKey(
                  itemListStore,
                  "name"
                ),
                className: "Formpagelayout__select_first",
                isopen: CurrentInput.isopen,
                ...Props_First,
              };

              return <CustomSelect {...CustomSelectProps} />;
            }
          }
          if (i === arr.length - 1) {
            const InputProps_Last = {
              className: "Formpagelayout__input_last",
              uniqKey: uniqKey,
              ...InputProps,
            };
            return <Input {...InputProps_Last} />;
          } else {
            const Default_Input = {
              uniqKey: uniqKey,
              ...InputProps,
            };

            if (
              CurrentInput.name === "description" &&
              CurrentInput.isopen !== null
            ) {
              const CustomSelectProps = {
                ShowList: ShowList,
                className: "Formpagelayout__select_nested",
                actualPositionsStore: MapArrayItemsBySpecificKey(
                  itemListStore,
                  "description"
                ),
                isopen: CurrentInput.isopen,
                ...Default_Input,
              };

              return <CustomSelect {...CustomSelectProps} />;
            }
            return <Input {...Default_Input} />;
          }
        })}
      </form>
      <Footer />
    </div>
  );
});

export default FormPage;
