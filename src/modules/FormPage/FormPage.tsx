import React, { useEffect } from "react";

import "./FormPage.css";
import PageLoader from "@modules/PageLoader/PageLoader";
import CustomSelect from "@shared/components/CustomSelect/CustomSelect";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import Input from "@shared/components/Input/Input";
import { formStore } from "@store/index";
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
    positionTypeStore,
  } = formStore;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    ChageShowWhatInputIsEmpty(false);
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

  // TO-DO здесь проблема
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
      document?.removeEventListener("click", DeleteAllHelpers);
    };
  }, [
    ArrayWithAllInputsStore,
    ObjectWithInfoEmailInputStore,
    DeleteAllHelpers,
  ]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты </header>
      <form className="FormPageLayout__form">
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
              if (
                positionTypeStore === "MANUAL" ||
                typeof isopen !== "boolean"
              ) {
                ChangeArrayWithAllInputs(value, name);
              } else {
                if (type === "click") {
                  ChangeArrayWithAllInputs(value, name);
                }
              }
            },
          };

          if (i === 0) {
            const InputProps_First = {
              className: "Formpagelayout__input_first",
              uniqKey: uniqKey,
              ...InputProps,
            };
            if (CurrentInput.isopen === null) {
              return <Input {...InputProps_First} />;
            } else {
              const CustomSelectProps = {
                ShowList: ShowList,
                actualPositionsStore: MapArrayItemsBySpecificKey(
                  itemListStore,
                  "name"
                ),
                isopen: CurrentInput.isopen,
                ...InputProps_First,
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
