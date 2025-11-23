"use client";

// TODO: Реализовать форму обратной связи
// - Добавить поля: имя, email, сообщение
// - Добавить валидацию
// - Добавить обработку отправки
// - Интегрировать с процессом send-contact-form

import { useState } from "react";

import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { Label } from "@/src/shared/ui/Label";
import { Textarea } from "@/src/shared/ui/Textarea";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // TODO: Реализовать обработку отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Интегрировать с процессом отправки
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={5}
          required
          className="resize-none"
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
