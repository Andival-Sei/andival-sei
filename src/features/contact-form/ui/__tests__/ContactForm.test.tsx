import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";

// Мокаем framer-motion для упрощения тестов
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("ContactForm component", () => {
  const mockFetch = vi.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("должен рендериться корректно", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Имя")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Сообщение")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /отправить/i })
    ).toBeInTheDocument();
  });

  it("должен обновлять значения полей при вводе", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.type(nameInput, "Иван Иванов");
    await user.type(emailInput, "ivan@example.com");
    await user.type(messageInput, "Тестовое сообщение");

    expect(nameInput).toHaveValue("Иван Иванов");
    expect(emailInput).toHaveValue("ivan@example.com");
    expect(messageInput).toHaveValue("Тестовое сообщение");
  });

  it("должен показывать ошибку при отправке пустой формы", async () => {
    render(<ContactForm />);

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    await waitFor(
      () => {
        expect(
          screen.getByText("Все поля обязательны для заполнения")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен показывать ошибку при некорректном email", async () => {
    render(<ContactForm />);

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
    }

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "некорректный-email");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const submitButton = screen.getByRole("button", { name: /отправить/i });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(
          screen.getByText("Некорректный email адрес")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен показывать ошибку при слишком длинном имени", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    const longName = "А".repeat(101);
    // Используем paste для длинного текста
    await user.clear(nameInput);
    nameInput.setAttribute("value", longName);
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));

    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const submitButton = screen.getByRole("button", { name: /отправить/i });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(
          screen.getByText("Имя не может быть длиннее 100 символов")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен показывать ошибку при слишком длинном сообщении", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    const longMessage = "А".repeat(5001);
    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    // Используем прямой ввод для длинного текста через изменение value
    await user.clear(messageInput);
    fireEvent.change(messageInput, { target: { value: longMessage } });

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    await waitFor(
      () => {
        expect(
          screen.getByText("Сообщение не может быть длиннее 5000 символов")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен успешно отправлять форму", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Сообщение успешно отправлено" }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван Иванов");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Тестовое сообщение");

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    // Ждем успешного ответа
    await waitFor(
      () => {
        expect(screen.getByText("Сообщение отправлено!")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Проверяем, что форма очистилась
    expect(screen.getByLabelText("Имя")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Сообщение")).toHaveValue("");

    // Проверяем вызов fetch
    expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Иван Иванов",
        email: "ivan@example.com",
        message: "Тестовое сообщение",
      }),
    });
  });

  it("должен обрабатывать ошибку сервера", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Ошибка сервера" }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    await waitFor(
      () => {
        expect(screen.getByText("Ошибка сервера")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен обрабатывать сетевую ошибку", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    await waitFor(
      () => {
        expect(screen.getByText("Network error")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("должен обрезать пробелы в начале и конце полей", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Успешно" }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "  Иван  ");
    await user.clear(emailInput);
    await user.type(emailInput, "  ivan@example.com  ");
    await user.clear(messageInput);
    await user.type(messageInput, "  Сообщение  ");

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    await waitFor(
      () => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            body: JSON.stringify({
              name: "Иван",
              email: "ivan@example.com",
              message: "Сообщение",
            }),
          })
        );
      },
      { timeout: 3000 }
    );
  });

  it("должен блокировать кнопку отправки во время загрузки", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValueOnce(promise);

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const form = document.querySelector("form");
    const submitButton = screen.getByRole("button", { name: /отправить/i });

    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    // Даем время на обновление состояния
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Кнопка должна быть заблокирована во время загрузки
    expect(submitButton).toBeDisabled();

    // Разрешаем промис
    resolvePromise!({
      ok: true,
      json: async () => ({ message: "Успешно" }),
    });
  });

  it("должен сбрасывать успешное сообщение через 3 секунды", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Успешно" }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Имя");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Сообщение");

    await user.clear(nameInput);
    await user.type(nameInput, "Иван");
    await user.clear(emailInput);
    await user.type(emailInput, "ivan@example.com");
    await user.clear(messageInput);
    await user.type(messageInput, "Сообщение");

    const form = document.querySelector("form");
    if (form) {
      (form as HTMLFormElement).noValidate = true;
      fireEvent.submit(form);
    }

    // Ждем успешного ответа
    await waitFor(
      () => {
        expect(screen.getByText("Сообщение отправлено!")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Используем реальные таймеры, но с увеличенным timeout
    await waitFor(
      () => {
        expect(
          screen.queryByText("Сообщение отправлено!")
        ).not.toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });
});
