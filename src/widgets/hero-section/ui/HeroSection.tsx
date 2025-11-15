import { Button } from '@/shared/ui/Button';
import styles from './HeroSection.module.scss';

/**
 * Виджет "Герой секция"
 * TODO: Добавить анимации и улучшить дизайн
 */
export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привет, я разработчик</h1>
        <p className={styles.subtitle}>
          Создаю современные веб-приложения с использованием лучших практик и технологий
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="large">
            Посмотреть проекты
          </Button>
          <Button variant="outline" size="large">
            Связаться со мной
          </Button>
        </div>
      </div>
    </section>
  );
};
