/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../../../App";
import "@testing-library/jest-dom";

describe("test FormPage", () => {
  test("Проверяем есть ли в форме все поля для ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61. Нет поля ввода для e-mail", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/test/formgen?key_gen=48acf988-686f-4be4-bc36-82bf827c3b61",
        ]}
      >
        <App />
      </MemoryRouter>
    );

    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const InputEmail = screen.queryByPlaceholderText("Email клиента для чека");

    expect(InputEmail).toBeNull();
  });
});
