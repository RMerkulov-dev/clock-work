import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddTimes from "./AddTimes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../stores/authStore", () => ({
  useAuthStore: vi.fn(() => ({ userId: "123" })),
}));

describe("AddTime render", () => {
  it("render form fields and buttons", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AddTimes />
      </QueryClientProvider>
    );
    expect(screen.getByRole("button", { name: "ADD" })).not.toBeDisabled();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Time/i)).toBeInTheDocument();
    expect(screen.getByText(/End Time/i)).toBeInTheDocument();
  });
});
