/** @jest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import App from "../../../App";

describe("test CopyButton", () => {
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

    fireEvent.click(generalButton);

    inputs.forEach((input: HTMLInputElement) => {
      expect(input).toHaveStyle({ border: "1px solid red" });
    });

    fireEvent.change(InputEmail, { target: { value: "rom@yandex.ru" } });

    fireEvent.change(inputDescription, { target: { value: "Новое значение" } });

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
