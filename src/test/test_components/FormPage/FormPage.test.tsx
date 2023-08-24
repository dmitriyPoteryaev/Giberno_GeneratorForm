/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

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

    const inputName = await screen.findAllByTestId("input-item");

    expect(inputName.length).toBe(3);

    const payment = await screen.findByText("Формирование оплаты");

    const payButton = await screen.findByText("Сформировать оплату");
    const header = await screen.findByText("Егоров Р.");

    const inputEmail = screen.queryByRole("input", { name: "email" });

    expect(payment).toBeInTheDocument();
    expect(payButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(inputEmail).toBeNull();
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
});
