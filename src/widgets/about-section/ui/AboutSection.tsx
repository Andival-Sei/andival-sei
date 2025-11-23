// TODO: Реализовать секцию "О себе"
// - Добавить текст о себе
// - Добавить список навыков
// - Добавить информацию об опыте
// - Добавить изображение (опционально)

import { Badge } from "@/src/shared/ui/Badge";
import { Section } from "@/src/shared/ui/Section";

export function AboutSection() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "Docker",
  ];

  return (
    <Section className="bg-muted/30 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I am a passionate Full Stack Developer with a keen eye for design
            and a drive for creating seamless digital experiences. With
            expertise in modern web technologies, I build scalable and
            performant applications that solve real-world problems.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-background">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br relative aspect-square overflow-hidden rounded-2xl from-indigo-500/20 to-purple-500/20 p-8">
          <div className="absolute inset-0 flex items-center justify-center text-indigo-500/20">
            {/* Abstract Graphic or Image Placeholder */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-full w-full opacity-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
