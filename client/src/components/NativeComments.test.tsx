/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockState = vi.hoisted(() => ({
  list: {
    data: [] as Array<{ id: number; userName: string; content: string; createdAt: Date }>,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  },
  create: {
    isPending: false,
    isError: true,
    mutate: vi.fn(),
  },
}));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { name: "Test User" },
  }),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    useUtils: () => ({
      comments: {
        list: { invalidate: vi.fn() },
      },
    }),
    comments: {
      list: {
        useQuery: () => mockState.list,
      },
      create: {
        useMutation: () => mockState.create,
      },
    },
  },
}));

import { NativeComments } from "./NativeComments";

describe("NativeComments", () => {
  beforeEach(() => {
    mockState.list.data = [];
    mockState.list.isLoading = false;
    mockState.list.isError = false;
    mockState.list.refetch.mockReset();
    mockState.create.isPending = false;
    mockState.create.isError = true;
    mockState.create.mutate.mockReset();
  });

  it("conserva el texto y permite reintentar una publicación fallida", () => {
    render(<NativeComments />);

    const textarea = screen.getByPlaceholderText("Escribe tu comentario aquí...");
    fireEvent.change(textarea, {
      target: { value: "Este comentario debe conservarse" },
    });

    expect(
      screen.getByText("No se pudo publicar el comentario. Inténtalo de nuevo."),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Reintentar publicación" }),
    );

    expect(textarea).toHaveValue("Este comentario debe conservarse");
    expect(mockState.create.mutate).toHaveBeenCalledWith({
      content: "Este comentario debe conservarse",
    });
  });

  it("muestra reintento cuando falla la carga de comentarios", () => {
    mockState.list.isError = true;
    render(<NativeComments />);

    expect(
      screen.getByText("No se pudieron cargar los comentarios en este momento."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(mockState.list.refetch).toHaveBeenCalledTimes(1);
  });
});
