/** @jest-environment jsdom */

import { render, screen, fireEvent } from "@testing-library/react";

import RenderWithRoter from "../helpers/RenderWithRoter";

import "@testing-library/jest-dom";

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
        fireEvent.change(input, { target: { value: "rom@yandex.ru" } });
      }
      if (input.name === "amount") {
        fireEvent.change(input, { target: { value: "123.10" } });
      }
      if (input.name === "namePos") {
        fireEvent.click(input);

        const select_namePos = screen.getAllByTestId("select-item");

        fireEvent.click(select_namePos[0]);
      }

      if (input.name === "description") {
        fireEvent.change(input, { target: { value: "description" } });
      }
    });

    const generalButton: HTMLButtonElement =
      screen.getByText(/Сформировать оплату/i);

    fireEvent.click(generalButton);

    const loadingElementUpdate = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElementUpdate).toBeInTheDocument();

    const result = await screen.findByText(/Счет успешно сформирован!/i);

    expect(result).toBeInTheDocument();
  });

  test("Не переходим", async () => {
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
      if (input.name === "amount") {
        fireEvent.change(input, { target: { value: "123.10" } });
      }
      if (input.name === "namePos") {
        fireEvent.click(input);

        const select_namePos = screen.getAllByTestId("select-item");

        fireEvent.click(select_namePos[0]);
      }

      if (input.name === "description") {
        fireEvent.change(input, { target: { value: "description" } });
      }
    });

    const generalButton: HTMLButtonElement =
      screen.getByText(/Сформировать оплату/i);

    fireEvent.click(generalButton);

    const loadingElementUpdate = screen.queryByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElementUpdate).toBeNull();

    const result = screen.queryByText(/Счет успешно сформирован!/i);

    expect(result).toBeNull();
  });
});
