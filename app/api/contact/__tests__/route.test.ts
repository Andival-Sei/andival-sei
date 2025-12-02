import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";

// Мокаем Resend
let mockResendSendInstance: ReturnType<typeof vi.fn>;

vi.mock("resend", () => {
  const mockSend = vi.fn();
  // Сохраняем ссылку на мок
  (globalThis as any).__mockResendSend = mockSend;
  return {
    Resend: class {
      emails = {
        send: mockSend,
      };
    },
  };
});

// Мокаем переменные окружения
const originalEnv = process.env;

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test-api-key",
      CONTACT_EMAIL: "test@example.com",
    };
    // Получаем мок из глобального объекта
    mockResendSendInstance = (globalThis as any).__mockResendSend || vi.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("должен успешно отправлять сообщение", async () => {
    mockResendSendInstance.mockResolvedValueOnce({
      data: { id: "test-id" },
      error: null,
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Иван Иванов",
        email: "ivan@example.com",
        message: "Тестовое сообщение",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Сообщение успешно отправлено");
    expect(mockResendSendInstance).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "onboarding@resend.dev",
        to: "test@example.com",
        replyTo: "ivan@example.com",
        subject: expect.stringContaining("Иван Иванов"),
      })
    );
  });

  it("должен возвращать ошибку при отсутствии обязательных полей", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "",
        email: "",
        message: "",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Отсутствуют обязательные поля");
  });

  it("должен возвращать ошибку при пустых полях после trim", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "   ",
        email: "   ",
        message: "   ",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Поля не могут быть пустыми");
  });

  it("должен возвращать ошибку при слишком длинном имени", async () => {
    const longName = "А".repeat(101);
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: longName,
        email: "ivan@example.com",
        message: "Сообщение",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("100 символов");
  });

  it("должен возвращать ошибку при слишком длинном сообщении", async () => {
    const longMessage = "А".repeat(5001);
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Иван",
        email: "ivan@example.com",
        message: longMessage,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("5000 символов");
  });

  it("должен возвращать ошибку при некорректном email", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Иван",
        email: "некорректный-email",
        message: "Сообщение",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Некорректный email адрес");
  });

  it("должен экранировать HTML для защиты от XSS", async () => {
    mockResendSendInstance.mockResolvedValueOnce({
      data: { id: "test-id" },
      error: null,
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "<script>alert('xss')</script>",
        email: "test@example.com",
        message: "<img src=x onerror=alert('xss')>",
      }),
    });

    await POST(request);

    expect(mockResendSendInstance).toHaveBeenCalled();
    const callArgs = mockResendSendInstance.mock.calls[0][0];
    expect(callArgs.html).not.toContain("<script>");
    expect(callArgs.html).toContain("&lt;script&gt;");
  });

  it("должен обрабатывать ошибку Resend", async () => {
    mockResendSendInstance.mockResolvedValueOnce({
      data: null,
      error: { message: "Resend error" },
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Иван",
        email: "ivan@example.com",
        message: "Сообщение",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Не удалось отправить сообщение");
  });

  it("должен обрабатывать ошибку парсинга JSON", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "invalid json",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Внутренняя ошибка сервера");
  });

  it("должен обрезать пробелы в полях", async () => {
    mockResendSendInstance.mockResolvedValueOnce({
      data: { id: "test-id" },
      error: null,
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "  Иван  ",
        email: "  ivan@example.com  ",
        message: "  Сообщение  ",
      }),
    });

    await POST(request);

    const callArgs = mockResendSendInstance.mock.calls[0][0];
    expect(callArgs.subject).toContain("Иван");
    expect(callArgs.replyTo).toBe("ivan@example.com");
    expect(callArgs.html).toContain("Сообщение");
    expect(callArgs.html).not.toContain("  Иван  ");
  });

  it("должен преобразовывать email в нижний регистр", async () => {
    mockResendSendInstance.mockResolvedValueOnce({
      data: { id: "test-id" },
      error: null,
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Иван",
        email: "IVAN@EXAMPLE.COM",
        message: "Сообщение",
      }),
    });

    await POST(request);

    const callArgs = mockResendSendInstance.mock.calls[0][0];
    expect(callArgs.replyTo).toBe("ivan@example.com");
  });
});
