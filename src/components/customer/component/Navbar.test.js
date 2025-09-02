// src/components/customer/component/Navbar.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock sessionStorage
beforeEach(() => {
  sessionStorage.setItem("username", "TestUser");
});

afterEach(() => {
  sessionStorage.clear();
});

test("renders Navbar with user and links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check username is displayed
  expect(screen.getByText("TestUser")).toBeInTheDocument();

  // Check all navbar links
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Accounts/i)).toBeInTheDocument();
  expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
  expect(screen.getByText(/Beneficiaries/i)).toBeInTheDocument();
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Loans/i)).toBeInTheDocument();

  // Check Logout button
  const logoutBtn = screen.getByText(/Logout/i);
  expect(logoutBtn).toBeInTheDocument();
});
