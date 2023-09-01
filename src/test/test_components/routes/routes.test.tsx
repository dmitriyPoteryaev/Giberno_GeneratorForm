/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";

import RenderWithRoter from "../helpers/RenderWithRoter";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("test Routing", () => {
  test("По ключу - da55122e-413b-4810-a565-93de82471ebc. Заполняем все поля в форме и нажимем кнопку - Сформировать оплату. После переходим на другую страницу", async () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    render(
      RenderWithRoter(
        null,
        "/test/formgen?key_gen=da55122e-413b-4810-a565-93de82471ebc"
      )
    );

    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const payment = await screen.findByText("Формирование оплаты");

    expect(payment).toBeInTheDocument();

    const inputs: HTMLInputElement[] = await screen.findAllByTestId(
      "input-item"
    );

    inputs.forEach((input: HTMLInputElement) => {
      if (input.name === "email") {
        userEvent.type(input, "rom@yandex.ru");
      }
      if (input.name === "amount") {
        userEvent.type(input, "123.10");
      }
      if (input.name === "namePos") {
        userEvent.click(input);

        const select_namePos = screen.getAllByTestId("select-item");

        userEvent.click(select_namePos[0]);
      }

      if (input.name === "description") {
        userEvent.type(input, "description");
      }
    });

    const generalButton: HTMLButtonElement =
      screen.getByText(/Сформировать оплату/i);

    userEvent.click(generalButton);

    const loadingElementUpdate = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElementUpdate).toBeInTheDocument();

    const result = await screen.findByText(/Счет успешно сформирован!/i);

    expect(result).toBeInTheDocument();
  });
});
