/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import App from "../../../App";
import "@testing-library/jest-dom";

describe("test FormPage", () => {
  test("По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61", async () => {
    // Ожидаем загрузки данных
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

    // Ожидаем появления обновленного состояния после выполнения useEffect

    const header = await screen.findByText("Егоров Р.");

    const payment = screen.getByText("Формирование оплаты");

    const payButton = screen.getByText("Сформировать оплату");

    expect(payment).toBeInTheDocument();
    expect(payButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });
  test("По несуществующему ключу - 48acf988-686f1. Status - 500", async () => {
    // Ожидаем загрузки данных
    render(
      <MemoryRouter initialEntries={["/test/formgen?key_gen=48acf988-686f1"]}>
        <App />
      </MemoryRouter>
    );
    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );
    expect(loadingElement).toBeInTheDocument();

    // Ожидаем появления обновленного состояния после выполнения useEffect

    const payment = await screen.findByText(
      "Request failed with status code 500. Что пошло не так! Перезагрузите страницу"
    );

    expect(payment).toBeInTheDocument();
  });

  test("Проверяем есть ли в форме все поля для ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61", async () => {
    // Ожидаем загрузки данных
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

    // Ожидаем появления обновленного состояния после выполнения useEffect

    const inputs = await screen.findAllByTestId("input-item");

    expect(inputs.length).toBe(3);

    const inputDescription = screen.getByPlaceholderText("Описание позиции");

    expect(inputDescription).toBeInTheDocument();

    const inputAmout = screen.getByPlaceholderText("Сумма");

    expect(inputAmout).toBeInTheDocument();
  });

  test("Проверяем есть ли в форме все поля дляь ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61. Нет поля ввода для e-mail", async () => {
    // Ожидаем загрузки данных
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

    const inputEmail = screen.queryByRole("input", { name: "email" });

    expect(inputEmail).toBeNull();
  });

  test("По нажатию на первый инпут должно появится select для выбора позиции. По нажатию на конкретную позицию - это значение должно появится в инпуте, а select будет не видно", async () => {
    // Ожидаем загрузки данных
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

    const inputs: HTMLInputElement[] = await screen.findAllByTestId("input-item");

    const [inputName, inputDesctiption] = inputs;

    const NoSelect = screen.queryByTestId("select");

    expect(NoSelect).toBeNull();

    userEvent.click(inputName);

    const SelectName = screen.getByTestId("select_0");

    expect(SelectName).toBeInTheDocument();

    const [selectNamePosition]: HTMLDivElement[] = screen.getAllByTestId("select-item");



    userEvent.click(selectNamePosition);

    expect(inputName.value).toBe(selectNamePosition.innerHTML);
    // expect(secondInput.value).toBe(firstPositionSelect.innerHTML);

    expect(NoSelect).toBeNull();

    userEvent.click(inputDesctiption);

    const select_itemsNext = screen.getAllByTestId("select-item");

    expect(inputDesctiption.value).toBe(select_itemsNext[0].innerHTML);
  });
});
