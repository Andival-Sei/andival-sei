import { ContactForm } from '@/features/contact-form';
import styles from './ContactPage.module.scss';

/**
 * Страница "Контакты"
 * Композиция виджетов для страницы контактов
 */
export const ContactPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Связаться со мной</h1>
        <p className={styles.description}>
          Заполните форму ниже, и я свяжусь с вами в ближайшее время.
        </p>
        <ContactForm />
      </section>
    </div>
  );
};
