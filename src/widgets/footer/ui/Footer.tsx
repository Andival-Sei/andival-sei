import styles from './Footer.module.scss';

/**
 * Виджет "Подвал сайта"
 * TODO: Добавить контакты и социальные сети
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© {currentYear} Andival SEI. Все права защищены.</p>
        <div className={styles.links}>{/* TODO: Добавить ссылки на социальные сети */}</div>
      </div>
    </footer>
  );
};
