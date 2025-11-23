"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

import { cn } from "@/src/shared/lib/utils";
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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Клиентская валидация
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setErrorMessage("Все поля обязательны для заполнения");
      return;
    }

    if (trimmedName.length > 100) {
      setStatus("error");
      setErrorMessage("Имя не может быть длиннее 100 символов");
      return;
    }

    if (trimmedMessage.length > 5000) {
      setStatus("error");
      setErrorMessage("Сообщение не может быть длиннее 5000 символов");
      return;
    }

    // Email валидация на клиенте
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Некорректный email адрес");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Что-то пошло не так");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить сообщение"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-foreground/80 text-sm font-medium"
          >
            Имя
          </Label>
          <Input
            id="name"
            placeholder="Иван Иванов"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            maxLength={100}
            className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-foreground/80 text-sm font-medium"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ivan@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            maxLength={254}
            className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="text-foreground/80 text-sm font-medium"
        >
          Сообщение
        </Label>
        <Textarea
          id="message"
          placeholder="Расскажите о вашем проекте..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={5}
          required
          maxLength={5000}
          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none transition-all duration-300"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-destructive flex items-center text-sm"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            {errorMessage}
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary flex items-center text-sm"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Сообщение отправлено!
          </motion.div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "ml-auto min-w-[140px] transition-all duration-300",
            status === "success" &&
              "bg-primary/20 text-primary hover:bg-primary/30"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <span className="flex items-center">
              Отправлено <CheckCircle2 className="ml-2 h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center">
              Отправить <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
