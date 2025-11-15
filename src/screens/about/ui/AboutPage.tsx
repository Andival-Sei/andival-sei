import styles from './AboutPage.module.scss';

/**
 * Страница "О себе"
 * TODO: Добавить информацию о себе
 */
export const AboutPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>О себе</h1>
        <p className={styles.content}>Информация о себе будет добавлена позже.</p>
      </section>
    </div>
  );
};
