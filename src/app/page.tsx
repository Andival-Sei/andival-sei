import { Button } from '@/components/Button';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Добро пожаловать в мое портфолио</h1>
        <p className={styles.description}>
          Это стартовая страница проекта, созданного с использованием Next.js 16, TypeScript, SCSS
          модулей и современного стека инструментов.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="large">
            Начать работу
          </Button>
          <Button variant="outline" size="large">
            Узнать больше
          </Button>
        </div>
      </main>
    </div>
  );
}
