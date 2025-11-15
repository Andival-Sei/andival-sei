import type { ContactFormData } from '@/entities/contact';

/**
 * API для отправки сообщения через форму контакта
 * TODO: Реализовать отправку на сервер
 */
export const sendMessage = async (data: ContactFormData): Promise<void> => {
  // TODO: Реализовать отправку на сервер
  console.log('Отправка сообщения:', data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
