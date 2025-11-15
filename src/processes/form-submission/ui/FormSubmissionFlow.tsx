'use client';

import { ReactNode } from 'react';
import { useFormSubmission } from '../model/useFormSubmission';
import type { ContactFormData } from '@/entities/contact';

interface FormSubmissionFlowProps {
  children: (props: {
    submit: (data: ContactFormData) => Promise<void>;
    status: 'idle' | 'submitting' | 'success' | 'error';
    error: string | null;
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
  }) => ReactNode;
}

/**
 * Компонент для управления процессом отправки формы
 * TODO: Реализовать интеграцию с уведомлениями
 */
export const FormSubmissionFlow = ({ children }: FormSubmissionFlowProps) => {
  const formSubmission = useFormSubmission();

  return <>{children(formSubmission)}</>;
};
