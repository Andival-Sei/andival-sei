import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Функция для экранирования HTML (защита от XSS)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Улучшенная валидация email
function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Ограничения длины полей
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  message: 5000,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { name, email, message } = body;

    // Проверка наличия полей
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 }
      );
    }

    // Удаление пробелов в начале и конце
    name = name.trim();
    email = email.trim().toLowerCase();
    message = message.trim();

    // Проверка на пустые строки после trim
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Поля не могут быть пустыми" },
        { status: 400 }
      );
    }

    // Проверка длины полей
    if (name.length > MAX_LENGTHS.name) {
      return NextResponse.json(
        { error: `Имя не может быть длиннее ${MAX_LENGTHS.name} символов` },
        { status: 400 }
      );
    }

    if (email.length > MAX_LENGTHS.email) {
      return NextResponse.json(
        { error: "Email слишком длинный" },
        { status: 400 }
      );
    }

    if (message.length > MAX_LENGTHS.message) {
      return NextResponse.json(
        {
          error: `Сообщение не может быть длиннее ${MAX_LENGTHS.message} символов`,
        },
        { status: 400 }
      );
    }

    // Валидация email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Некорректный email адрес" },
        { status: 400 }
      );
    }

    // Экранирование HTML для защиты от XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Отправка email через Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // TODO: Замените на ваш верифицированный домен
      to: process.env.CONTACT_EMAIL || "your-email@example.com", // Email получателя
      replyTo: email, // Email отправителя формы
      subject: `Новое сообщение от ${safeName}`,
      html: `
        <h2>Новое сообщение с формы обратной связи</h2>
        <p><strong>Имя:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Не удалось отправить сообщение" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Сообщение успешно отправлено", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
