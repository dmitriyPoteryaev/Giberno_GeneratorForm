import React, { useEffect } from "react";

import "./FormPage.css";
import PageLoader from "@modules/PageLoader/PageLoader";
import CustomSelect from "@shared/components/CustomSelect/CustomSelect";
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";
import Input from "@shared/components/Input/Input";
import { formStore } from "@store/index";
import { sortNamesPositionsByLetter } from "@utils/sortNamesPositionsByLetter";
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
    actualPositionsStore,
    ShowList,
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
  }, [navigate, location.search, ChangeDataAboutForm]);

  // TO-DO здесь проблема
  useEffect(() => {
    if (
      ArrayWithAllInputsStore.some(
        (elem: any) => elem.IsShowInfoHelp === true
      ) ||
      ObjectWithInfoEmailInputStore.IsShowInfoHelp ||
      ArrayWithAllInputsStore?.[0]?.isopen
    ) {
      document.addEventListener("click", DeleteAllHelpers);
    }

    return () => {
      document?.removeEventListener("click", DeleteAllHelpers);
    };
  }, [ArrayWithAllInputsStore, ObjectWithInfoEmailInputStore]);

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты </header>
      <form className="FormPageLayout__form">
        <div className="FormPageLayout__title">{clientTitleStore}</div>
        {ArrayWithAllInputsStore.filter((CurrentInput: any, i: any) => {
          if (!CurrentInput.IsEnabled && i === 1) {
            return;
          } else {
            return CurrentInput;
          }
        }).map((CurrentInput: any, i: any, arr: any) => {
          const uniqKey =
            typeof CurrentInput.isopen === "boolean"
              ? `select${i}`
              : `input${i}`;
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
            onChange: (event: any, k: any, curname: any) =>
              ChangeArrayWithAllInputs(event, k, curname),
          };
          if (i === 0) {
            if (CurrentInput.isopen === null) {
              const InputProps_First = {
                className: "Formpagelayout__input_first",
                uniqKey: uniqKey,
                ...InputProps,
              };
              return <Input {...InputProps_First} />;
            } else {
              const CustomSelectProps = {
                className: "Formpagelayout__input_first",
                uniqKey: uniqKey,
                ShowList: ShowList,
                ...InputProps,
              };
              const handler = (elem: any) => {
                InputProps.onChange(
                  elem,
                  InputProps.currentNumber,
                  InputProps.name
                );
              };

              const sortinArrayPositon = sortNamesPositionsByLetter(
                actualPositionsStore,
                CurrentInput.value
              );
              return (
                <div key={uniqKey} className="CustomSelect">
                  <Input {...CustomSelectProps} />
                  {CurrentInput.isopen && (
                    <div className="CustomLIstForSelect">
                      {sortinArrayPositon.map((elem: any) => (
                        <div
                          key={elem}
                          className="CustomLIstForSelect_position"
                          onClick={() => {
                            handler(elem);
                          }}
                        >
                          {elem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
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
            return <Input {...Default_Input} />;
          }
        })}
      </form>
      <Footer />
    </div>
  );
});

export default FormPage;
