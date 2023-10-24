/** @jest-environment jsdom */
import React from "react";

import CopyButton from "@shared/components/CopyButton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("test CopyButton", () => {
  test("Отображается ли нужный children в кнопке", () => {
    render(<CopyButton>Я здесь</CopyButton>);

    const element = screen.getByText(/Я здесь/i);
    expect(element).toBeInTheDocument();
  });
  test("Есть ли в функциональном компоненте тег - button", () => {
    render(<CopyButton>Я здесь</CopyButton>);

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });
});
