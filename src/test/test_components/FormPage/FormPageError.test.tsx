/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../../../App";
import "@testing-library/jest-dom";

describe("test FormPage", () => {
  test("По несуществующему ключу - 48acf988-686f-4be4", async () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    const route = "/test/formgen?key_gen=448acf988-686f-4be4f";

    render(
      <MemoryRouter initialEntries={["/test/formgen?key_gen=8fe86f19-9477"]}>
        <App />
      </MemoryRouter>
    );
    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    // to-do выяснить почему так

    const loadingElementUpadate = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElementUpadate).toBeInTheDocument();

    const payment = await screen.findByText(
      /Request failed with status code 500. Что пошло не так! Перезагрузите страницу/i
    );

    expect(payment).toBeInTheDocument();
  });
});
