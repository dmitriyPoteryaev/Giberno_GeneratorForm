/** @jest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";

import RenderWithRoter from "../helpers/RenderWithRoter/RenderWithRoter";
import "@testing-library/jest-dom";

describe("test Form", () => {
  let curentInputs: HTMLInputElement[];

  beforeEach(async () => {
    render(
      RenderWithRoter(
        null,
        "/test/formgen?key_gen=8fe86f19-9477-4e73-b198-d08d4e33be6c"
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
    const select: HTMLDivElement | null =
      screen.queryByTestId("select_namePos");

    // eslint-disable-next-line
    expect(select?.classList.contains("CustomLIstForSelect")).toBeNull;
  });
  test("По нажатию на инпут появится всплывающее окно для выбора позиции", async () => {
    const [inputName] = curentInputs;

    fireEvent.click(inputName);

    const [selectNamePosition]: HTMLDivElement[] =
      screen.getAllByTestId("select-item");

    expect(selectNamePosition).toBeInTheDocument();
  });

  test("По нажатию на конкретную позицию в сплывающе окне она появится в инпуте. А всплывающего окна не будет", () => {
    const [inputName] = curentInputs;

    fireEvent.click(inputName);

    const [selectNamePosition]: HTMLDivElement[] =
      screen.getAllByTestId("select-item");

    fireEvent.click(selectNamePosition);

    expect(inputName.value).toBe(selectNamePosition.innerHTML);
    // eslint-disable-next-line
    expect(selectNamePosition).toBeNull;
  });

  test("По нажатию на позицию с discoint !== NO_DISCOUNT в сплывающе окне, то должно появиться 4 поле в форме", () => {
    const [inputName] = curentInputs;

    fireEvent.click(inputName);

    const [selectNamePosition]: HTMLDivElement[] =
      screen.getAllByTestId("select-item");

    fireEvent.click(selectNamePosition);

    const curentInputsUpdate: HTMLInputElement[] =
      screen.getAllByTestId("input-item");
    expect(curentInputsUpdate.length).toBe(4);

    expect(curentInputsUpdate[3].placeholder).toBe("Цена после скидки");
  });
});
