'use client';

import { useContactForm } from '../model/useContactForm';
import { Button } from '@/shared/ui/Button';
import styles from './ContactForm.module.scss';

/**
 * Компонент формы обратной связи
 * TODO: Добавить стили и улучшить UI
 */
export const ContactForm = () => {
  const { formData, errors, isLoading, isSuccess, handleChange, handleSubmit } = useContactForm();

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <p>Спасибо! Ваше сообщение отправлено.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={isLoading}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={isLoading}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Тема</label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          disabled={isLoading}
        />
        {errors.subject && <span className={styles.error}>{errors.subject}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Сообщение</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          disabled={isLoading}
          rows={5}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
};
