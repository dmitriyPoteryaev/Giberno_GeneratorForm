/** @jest-environment jsdom */

import { render, screen } from "@testing-library/react";

import RenderWithRoter from "../helpers/RenderWithRoter";
import "@testing-library/jest-dom";

describe("test FormPage", () => {
  test("Проверяем есть ли в форме все поля для ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61. Нет поля ввода для e-mail", async () => {
    render(
      RenderWithRoter(
        null,
        "/test/formgen?key_gen=5d60d33f-5251-4b19-8925-56d757a3cb20"
      )
    );

    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const InputEmail = screen.queryByPlaceholderText("Email клиента для чека");

    expect(InputEmail).toBeNull();
  });
});
