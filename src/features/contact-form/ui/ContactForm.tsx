'use client';

// TODO: Реализовать форму обратной связи
// - Добавить поля: имя, email, сообщение
// - Добавить валидацию
// - Добавить обработку отправки
// - Интегрировать с процессом send-contact-form

import { useState } from 'react';
import { Button } from '@/src/shared/ui/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // TODO: Реализовать обработку отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Интегрировать с процессом отправки
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TODO: Добавить валидацию полей */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          required
        />
      </div>
      
      <Button type="submit">Send Message</Button>
    </form>
  );
}

