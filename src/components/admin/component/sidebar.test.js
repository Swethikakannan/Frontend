import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./sidebar";

// Suppress React Router Future Flag warnings
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((msg) => {
    if (!msg.includes("React Router Future Flag Warning")) {
      console.warn(msg);
    }
  });
});

describe("Sidebar Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  });

  test("renders sidebar heading", () => {
    const heading = screen.getByRole("heading", { name: /admin dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders all sidebar links", () => {
    const links = [
      { name: /dashboard/i, href: "/admin/dashboard" },
      { name: /customers/i, href: "/admin/customers" },
      { name: /accounts/i, href: "/admin/accounts" },
      { name: /transactions/i, href: "/admin/transactions" },
      { name: /loans/i, href: "/admin/loan" },
      { name: /employees/i, href: "/admin/employees" },
      { name: /beneficiary/i, href: "/admin/beneficiary" },
      { name: /audit log/i, href: "/admin/auditlog" },
    ];

    links.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.name });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.href);
    });
  });
});
