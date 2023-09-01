/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "@shared/components/Input";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "../../../App";

describe("test CopyButton", () => {
  test("Отображается ли нужный переданное value в input", () => {
    render(<Input value="Я здесь" />);

    const inputElement = screen.getByRole("textbox"); // находим инпут по его роли (textbox)

    expect(inputElement).toHaveValue("Я здесь");
  });
  test("Если есть help. То будет ли отображаться в инпуте", () => {
    render(<Input help="something help note" value="Я здесь" />);

    const inputElement = screen.getByAltText("help_icon"); // находим инпут по его роли (textbox)

    expect(inputElement).toBeInTheDocument();
  });
  test("Если есть help. То будет ли отображаться в инпуте", () => {
    render(<Input value="Я здесь" />);

    const img = screen.queryByRole("img"); // находим инпут по его роли (textbox)
    const inputElement = screen.getByRole("textbox"); // находим инпут по его роли (textbox)

    expect(inputElement).toHaveValue("Я здесь");

    expect(img).toBeNull();
  });
  test("Тестирование стилей инпут. В полях нет никакого значения. Границы инпутов должны быть красными", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/test/formgen?key_gen=da55122e-413b-4810-a565-93de82471ebc",
        ]}
      >
        <App />
      </MemoryRouter>
    );

    const loadingElement = await screen.findByText(
      "Ожидайте, скоро появится Ваш заказ!"
    );

    expect(loadingElement).toBeInTheDocument();

    const inputs: HTMLInputElement[] = await screen.findAllByTestId(
      "input-item"
    );

    const [inputName, inputDescription, inputAmout, InputEmail] = inputs;

    const generalButton = screen.getByText(/Сформировать оплату/i);

    userEvent.click(generalButton);

    inputs.forEach((input: HTMLInputElement) => {
      expect(input).toHaveStyle({ border: "1px solid red" });
    });

    userEvent.type(InputEmail, "rom@yandex.ru");

    userEvent.type(inputDescription, "Описание для заказа");

    const inputsUpdate: HTMLInputElement[] =
      screen.getAllByTestId("input-item");

    inputsUpdate.forEach((input: HTMLInputElement) => {
      if (input.name === "email" || input.name === "description") {
        expect(input).not.toHaveStyle({ border: "1px solid red" });
      } else {
        expect(input).toHaveStyle({ border: "1px solid red" });
      }
    });
  });
});
