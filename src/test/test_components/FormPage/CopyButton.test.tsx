/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import CopyButton from "@shared/components/CopyButton";
import { BrowserRouter as Router } from "react-router-dom";
test("Example 1 renders successfully", () => {
  render(<CopyButton>Я здесь</CopyButton>);

  const element = screen.getByText(/Я здесь/i);

  expect(element).toBeInTheDocument();
});
