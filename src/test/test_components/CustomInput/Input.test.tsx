/** @jest-environment jsdom */
import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "@shared/components/Input";

describe("test CopyButton", () => {
  test("Отображается ли нужный переданное value в input", () => {
    render(<Input value="Я здесь" />);

    const inputElement = screen.getByRole("textbox"); // находим инпут по его роли (textbox)

    expect(inputElement).toHaveValue("Я здесь");
  });
  test("Если есть help. То будет ли отображаться в игнпуте", () => {
    render(<Input help="something help note" value="Я здесь" />);

    const inputElement = screen.getByAltText("help_icon"); // находим инпут по его роли (textbox)

    expect(inputElement).toBeInTheDocument();
  });
  test("Если есть help. То будет ли отображаться в игнпуте", () => {
    render(<Input value="Я здесь" />);

    const img = screen.queryByRole("img"); // находим инпут по его роли (textbox)
    const inputElement = screen.getByRole("textbox"); // находим инпут по его роли (textbox)

    expect(inputElement).toHaveValue("Я здесь");

    expect(img).toBeNull();
  });
});
