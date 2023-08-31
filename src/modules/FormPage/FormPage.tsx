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
import { useLocation } from "react-router-dom";

const FormPage = observer(() => {
  const { ChangeDataAboutForm } = formStore;

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(ChangeDataAboutForm);

  const location = useLocation();

  useEffect(() => {
    let key_gen = "48acf988-686f-4be4-bc36-82bf827c3b61";

    location.search.split("&").forEach((line, i) => {
      key_gen = line.split("=")[1] || "48acf988-686f-4be4-bc36-82bf827c3b61";
    });

    fetching(key_gen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
