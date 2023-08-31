/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import "@testing-library/jest-dom";

describe("test Footer. По ключу - 5d60d33f-5251-4b19-8925-56d757a3cb20", () => {
  test("Проверяем есть ли в форме все поля для ввода. По ключу - 5d60d33f-5251-4b19-8925-56d757a3cb20. Есть поля ввода для e-mail", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/test/formgen?key_gen=5d60d33f-5251-4b19-8925-56d757a3cb20",
        ]}
      >
        <App />
      </MemoryRouter>
    );

    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const InputEmail = await screen.findByPlaceholderText(
      /Email клиента для чека/i
    );

    expect(InputEmail).toBeInTheDocument();
  });
});