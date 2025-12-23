import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "../App";

/**
 * Mock alert
 */

vi.mock("react-qr-code", () => ({
  QRCode: ({ value }: any) => <div data-testid="qr">{value}</div>,
}));

beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("QR Generator", () => {
  test("renders input fields and button", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
    expect(screen.getByText("Generate QR Code")).toBeInTheDocument();
  });

  test("shows alert if fields are empty", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
  });

  test("generates QR code when all fields are filled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    const expectedValue = "000001DonGymJohnDoe25";

    expect(screen.getByText(`Generated Code:`)).toBeInTheDocument();

    const matches = screen.getAllByText(expectedValue);
    expect(matches.length).toBeGreaterThan(0);

  });
});

describe("QR Generator - Additional Tests", () => {
  test("does not generate QR if only first name is filled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if only last name is filled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if only age is filled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if two fields are filled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

    test("generates QR only when all fields are filled with preset format", () => {
    render(
        <MemoryRouter>
        <App />
        </MemoryRouter>
    );

    const firstName = "Jane";
    const lastName = "Smith";
    const age = "30";

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
        target: { value: firstName },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
        target: { value: lastName },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
        target: { value: age },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    const expectedValue = `000001DonGym${firstName}${lastName}${age}`;

    // Check that the paragraph exists
    expect(screen.getByText("Generated Code:")).toBeInTheDocument();

    // Check the QR code value specifically
    expect(screen.getByTestId("qr")).toHaveTextContent(expectedValue);
    });

  test("does not generate QR if age is negative or zero", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "0" },
    });

    fireEvent.click(screen.getByText("Generate QR Code"));

    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if first name is empty", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "25" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if last name is empty", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "25" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if age is empty", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if age is negative", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "-5" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("does not generate QR if age is zero", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "0" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Complete All Fields");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("generates QR for valid names and age", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Johnson" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "40" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    const expectedValue = "000001DonGymAliceJohnson40";
    expect(screen.getByTestId("qr")).toHaveTextContent(expectedValue);
    expect(screen.getByText("Generated Code:")).toBeInTheDocument();
  });

  test("trims whitespace from inputs before generating QR", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "  Bob " } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: " Smith " } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "22" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    expect(window.alert).toHaveBeenCalledWith("Invalid input, try again");
    expect(screen.queryByText("Generated Code:")).not.toBeInTheDocument();
  });

  test("generates QR with numeric names allowed", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "User123" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Test456" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "33" } });
    fireEvent.click(screen.getByText("Generate QR Code"));
    const expectedValue = "000001DonGymUser123Test45633";
    expect(screen.getByTestId("qr")).toHaveTextContent(expectedValue);
  });

});
