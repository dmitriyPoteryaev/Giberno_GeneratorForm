/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../../../App";
import "@testing-library/jest-dom";

describe("test FormPage", () => {
 
  test("По ключу - 8fe86f19-9477-4e73-b198-d08d4e33be6c", async () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    render(
      <MemoryRouter  initialEntries={[
        "/test/formgen?key_gen=8fe86f19-9477-4e73-b198-d08d4e33be6c",
      ]}>
        <App />
      </MemoryRouter>
    );
    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();


    const payment = await screen.findByText("Формирование оплаты");

    expect(payment).toBeInTheDocument();
  });

});
