/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RenderWithRoter from "../helpers/RenderWithRoter/RenderWithRoter";
import "@testing-library/jest-dom";

describe("test Form", () => {
  let curentInputs: HTMLInputElement[];

  beforeEach(async () => {
    render(
      RenderWithRoter(
        null,
        "/test/formgen?key_gen=48acf988-686f-4be4-bc36-82bf827c3b61"
      )
    );
    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const inputsResponse: HTMLInputElement[] = await screen.findAllByTestId(
      "input-item"
    );

    curentInputs = inputsResponse;
  });
  test("Проверяем есть ли в форме все поля для ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61", () => {
    // Ожидаем загрузки данных

    // Ожидаем появления обновленного состояния после выполнения useEffect

    const [inputName, inputDescription, inputAmout] = curentInputs;

    expect(curentInputs.length).toBe(3);

    expect(inputDescription.placeholder).toBe("Описание позиции");

    expect(inputAmout.placeholder).toBe("Сумма");
    expect(inputName.placeholder).toBe("");
  });

  test("Проверяем есть ли в форме все поля для ввода. По ключу - 48acf988-686f-4be4-bc36-82bf827c3b61. Нет поля ввода для e-mail", () => {
    // Ожидаем загрузки данных

    const inputEmail = screen.queryByRole("input", { name: "email" });

    expect(inputEmail).toBeNull();
  });

  test("Всплывающего окна для выбора конкретной позиции не будет видно", () => {
    const select = screen.queryByTestId("select_namePos");

    expect(select).toBeNull();
  });
  test("По нажатию на инпут появится всплывающее окно для выбора позиции", () => {
    const [inputName] = curentInputs;

    userEvent.click(inputName);

    const SelectName = screen.getByTestId("select_namePos");

    expect(SelectName).toBeInTheDocument();
  });

  test("По нажатию на конкретную позицию в сплывающе окне она появится в инпуте. А всплывающего окна не будет", () => {
    const [inputName] = curentInputs;

    userEvent.click(inputName);

    const [selectNamePosition]: HTMLDivElement[] =
      screen.getAllByTestId("select-item");

    userEvent.click(selectNamePosition);

    const SelectName = screen.queryByTestId("select_namePos");

    expect(inputName.value).toBe(selectNamePosition.innerHTML);
    expect(SelectName).toBeNull();
  });

  test("По нажатию на позицию с discoint !== NO_DISCOUNT в сплывающе окне, то должно появиться 4 поле в форме", () => {
    const [inputName] = curentInputs;

    userEvent.click(inputName);

    const [selectNamePosition]: HTMLDivElement[] =
      screen.getAllByTestId("select-item");

    userEvent.click(selectNamePosition);

    const curentInputsUpdate: HTMLInputElement[] =
      screen.getAllByTestId("input-item");
    expect(curentInputsUpdate.length).toBe(4);

    expect(curentInputsUpdate[3].placeholder).toBe("Цена после скидки");
  });
});
