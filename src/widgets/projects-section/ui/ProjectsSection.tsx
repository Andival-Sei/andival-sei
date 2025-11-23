import { projects } from "@/src/entities/project/model/project-data";
import { ProjectCard } from "@/src/features/project-card";
import { Section } from "@/src/shared/ui/Section";

export function ProjectsSection() {
  const metrics = [
    {
      label: "Активные треки",
      value: projects.length.toString().padStart(2, "0"),
      hint: "Кейсы в работе",
    },
    {
      label: "Фокус",
      value: "Дизайн + разработка",
      hint: "Системы, доставка, эксперименты",
    },
    {
      label: "Ритм",
      value: "Еженедельные релизы",
      hint: "Небольшие части вместо больших переписываний",
    },
  ];

  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(16,185,129,0.06),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="text-primary flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
              <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                Лаборатория проектов
              </span>
              <span className="text-muted-foreground">
                Заглушки сегодня — отполированные кейсы дальше
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Готовые к релизу эксперименты
            </h2>
            <p className="text-muted-foreground text-lg">
              Рабочее пространство, ориентированное на дизайн, где я создаю
              системы, инструменты доставки и UX-эксперименты. Реальные сборки в
              работе; визуалы появятся после прохождения ревью.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-card/70 border-border/70 rounded-xl border p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="text-muted-foreground text-sm">{metric.hint}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/80 border-border/70 rounded-2xl border p-6 shadow-lg backdrop-blur">
            <div className="text-muted-foreground text-xs uppercase tracking-[0.15em]">
              Заметки о процессе
            </div>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <div className="text-foreground font-semibold">
                Дизайн × разработка, без разрыва передачи.
              </div>
              <p>
                Я набрасываю потоки, кодифицирую паттерны и настраиваю DX, чтобы
                команда продолжала поставлять без лишней церемонии.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                  <div>
                    <p className="text-foreground">Быстрые циклы</p>
                    <p>Демонстрируемые части каждую неделю.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                  <div>
                    <p className="text-foreground">Системы в первую очередь</p>
                    <p>Переиспользуемые основы лучше разовых экранов.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                  <div>
                    <p className="text-foreground">Четкие результаты</p>
                    <p>
                      Каждый релиз поставляется с историей и линией принятия.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}
