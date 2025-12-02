import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BurgerMenu } from "../BurgerMenu";

// Мокаем Next.js
const mockPathname = vi.fn(() => "/");

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Мокаем framer-motion полностью
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Мокаем createPortal - просто возвращаем узел
const originalCreatePortal = require("react-dom").createPortal;
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    createPortal: (node: any) => node,
  };
});

describe("BurgerMenu component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockPathname.mockReturnValue("/");
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
    vi.clearAllMocks();
  });

  it("должен рендериться корректно", async () => {
    render(<BurgerMenu />);
    await waitFor(
      () => {
        const menuButton = screen.getByLabelText("Toggle menu");
        expect(menuButton).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен открываться при клике на кнопку", async () => {
    render(<BurgerMenu />);
    await waitFor(
      () => {
        expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const menuButton = screen.getByLabelText("Toggle menu");
    await user.click(menuButton);

    await waitFor(
      () => {
        expect(screen.getByText("Главная")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен отображать все пункты навигации когда открыт", async () => {
    render(<BurgerMenu />);
    await waitFor(
      () => {
        expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const menuButton = screen.getByLabelText("Toggle menu");
    await user.click(menuButton);

    await waitFor(
      () => {
        expect(screen.getByText("Главная")).toBeInTheDocument();
        expect(screen.getByText("Проекты")).toBeInTheDocument();
        expect(screen.getByText("Обо мне")).toBeInTheDocument();
        expect(screen.getByText("Lab")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен блокировать прокрутку страницы когда меню открыто", async () => {
    render(<BurgerMenu />);
    await waitFor(
      () => {
        expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const menuButton = screen.getByLabelText("Toggle menu");
    await user.click(menuButton);

    await waitFor(
      () => {
        expect(document.body.style.overflow).toBe("hidden");
      },
      { timeout: 3000 }
    );
  });
});
