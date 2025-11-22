// TODO: Реализовать бейдж навыка
// Компонент для отображения навыка в виде бейджа

import type { Skill } from '../model/types';

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
      {skill.name}
      {/* TODO: Добавить визуальное отображение уровня навыка */}
    </span>
  );
}

