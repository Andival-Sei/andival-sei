'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/entities/contact';
import { sendMessage } from '@/features/contact-form/api/sendMessage';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Процесс "Отправка формы"
 * Управляет валидацией, отправкой и уведомлениями
 * TODO: Реализовать уведомления и обработку ошибок
 */
export const useFormSubmission = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ContactFormData) => {
    try {
      setStatus('submitting');
      setError(null);

      // Валидация
      // TODO: Добавить расширенную валидацию

      // Отправка
      await sendMessage(data);

      setStatus('success');

      // TODO: Показать уведомление об успехе
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Ошибка отправки формы');
      // TODO: Показать уведомление об ошибке
    }
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return {
    status,
    error,
    submit,
    reset,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};
