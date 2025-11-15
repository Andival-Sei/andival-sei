import Link from 'next/link';
import type { Project } from '@/entities/project';
import { Button } from '@/shared/ui/Button';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
}

/**
 * Виджет "Карточка проекта"
 * TODO: Добавить изображения и улучшить дизайн
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        {/* TODO: Добавить изображение проекта */}
        <div className={styles.placeholder}>Изображение проекта</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.technologies}>
          {project.technologies.map((tech: string) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          {project.link && (
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="small">
                Открыть
              </Button>
            </Link>
          )}
          {project.github && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="small">
                GitHub
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
