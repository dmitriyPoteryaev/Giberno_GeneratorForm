import React, { useEffect } from "react";

import "./FormPage.css";
import useFetching from "@hooks/useFetching";
import PageError from "@modules/PageError/PageError";
import PageLoader from "@modules/PageLoader/PageLoader";
import Footer from "@shared/components/Footer";
import Form from "@shared/components/Form";
import Header from "@shared/components/Header";
import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

const FormPage = observer(() => {
  const { DeleteAllPopUpWindow, ChangeDataAboutForm } = formStore;

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(ChangeDataAboutForm);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const curData: any = {
      key_gen: "48acf988-686f-4be4-bc36-82bf827c3b61",
    };

    location.search.split("&").forEach((line, i) => {
      curData.key_gen =
        line.split("=")[1] || "48acf988-686f-4be4-bc36-82bf827c3b61";
    });
    navigate("/test/formgen?key_gen=" + curData.key_gen);
    fetching(curData.key_gen);
    document.addEventListener("click", DeleteAllPopUpWindow);

    return () => {
      document.removeEventListener("click", DeleteAllPopUpWindow);
    };
  }, []);

  if (isLoading) {
    return <PageLoader description={"Ожидайте, скоро появится Ваш заказ!"} />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <div className="FormPageLayout">
      <Header />
      <header className="FormPageLayout__header">Формирование оплаты</header>
      <Form></Form>
      <Footer />
    </div>
  );
});

export default FormPage;
