import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../src/components/Hero";
import CounterButton from "../src/components/CounterButton";
import * as counterService from "../src/service/counter.service";

describe("Hero test", () => {
  it("renders the correct text with the right class", () => {
    render(<Hero />);

    const element = screen.getByText("DevOps");

    // Verifica que el elemento esté en el documento y tenga la clase correcta
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("gradient-text");
  });
});

describe("Button test", () => {
  it("renders the button with initial counter and increments on click", async () => {
    // Mock fn getCounter para traer 5
    vi.spyOn(counterService, "getCounter").mockResolvedValue({ counter: 5 });

    // Mock fn incrementCounter para incrementar a 6
    vi.spyOn(counterService, "incrementCounter").mockResolvedValue({
      counter: 6,
    });

    render(<CounterButton />);

    // Esperar a quitar loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Esperar al botón con el contador inicial
    const button = await screen.findByRole("button", { name: /Contador: 5/i });
    expect(button).toBeInTheDocument();

    // Click al botón para incrementar el contador
    fireEvent.click(button);

    // Esperar al botón con el contador incrementado
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Contador: 6/i })
      ).toBeInTheDocument()
    );
  });
});
