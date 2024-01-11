import { describe, expect, vi } from "vitest";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import {act, render, renderHook} from "@testing-library/react";
import LoginModal from "./LoginModal";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("path to hooks");
vi.mock("path to axios utils");
vi.mock("react-hot-toast");

const setup = () => {
    render( <LoginModal />);
};

describe("Test Login Modal component", () => {
  it("Is useRegister hook initial state closed", () => {
    const { result } = renderHook(() => useRegisterModal());
    expect(result.current.isOpen).toBe(false);
  });

  it("Should open modal when isOpen called", () => {
    const { result } = renderHook(() => useRegisterModal());

    act(() => {
      result.current.onOpen();
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
});

describe("Render LoginModal Component correctly",()=>{
    it("rendering correctly",()=>{
     setup()
    })
})
