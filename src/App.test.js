import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock axios globally
jest.mock("axios", () => {
  const mockAxios = jest.fn(() => Promise.resolve({ data: [] }));
  mockAxios.create = jest.fn(() => mockAxios);
  mockAxios.interceptors = { request: { use: jest.fn() }, response: { use: jest.fn() } };
  mockAxios.get = jest.fn(() => Promise.resolve({ data: [] }));
  mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }));
  return mockAxios;
});

describe("App routing", () => {
  test("renders login page by default", () => {
    // navigate to login route
    window.history.pushState({}, "Login page", "/");
    render(<App />);

    // Query the login **heading specifically**
    const loginHeading = screen.getByRole("heading", { name: /maverick bank/i });
    expect(loginHeading).toBeInTheDocument();

    // Query the login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("renders register page", () => {
    // navigate to register route
    window.history.pushState({}, "Register page", "/register");
    render(<App />);

    // Query the register **heading**
    const registerHeading = screen.getByRole("heading", { name: /register yourself/i });
    expect(registerHeading).toBeInTheDocument();

    // Query the register button
    const registerButton = screen.getByRole("button", { name: /^register$/i });
    expect(registerButton).toBeInTheDocument();
  });
});
