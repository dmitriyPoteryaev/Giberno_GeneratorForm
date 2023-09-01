/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RenderWithRoter from "../helpers/RenderWithRoter";
import "@testing-library/jest-dom";

describe("test AmountInput", () => {
  let curentInput: HTMLInputElement;
  beforeEach(async () => {
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

    curentInput = await screen.findByPlaceholderText(/Сумма/i);
  });
  test("Тестирование  AmountInput. По ключу - da55122e-413b-4810-a565-93de82471ebc. На вход - fefwefweew. На выходе пустая строка", () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    userEvent.type(curentInput, "fefwefweew");
    expect(curentInput.value).toBe("");
  });
  test("Тестирование  AmountInput. По ключу - da55122e-413b-4810-a565-93de82471ebc. На вход - 123.10 RUB. На выходе 123.10", () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    userEvent.type(curentInput, "123.10 RUB");
    expect(curentInput.value).toBe("123.10");
  });

  test("Тестирование  AmountInput. По ключу - da55122e-413b-4810-a565-93de82471ebc .На вход - 222 222,01 RUB. На выходе 222222.01", () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    userEvent.type(curentInput, "222 222,01 RUB");
    expect(curentInput.value).toBe("222222.01");
  });

  test("Тестирование  AmountInput. По ключу - da55122e-413b-4810-a565-93de82471ebc .На вход - 00000000. На выходе 0.00", () => {
    // Ожидаем появления обновленного состояния после выполнения useEffect

    userEvent.type(curentInput, "00000000");
    expect(curentInput.value).toBe("0.00");
  });
});
