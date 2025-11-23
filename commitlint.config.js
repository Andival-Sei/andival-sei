module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Типы коммитов - обязательное правило
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // Базовые правила формата
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    // Упрощённые правила - только предупреждения
    "scope-case": [1, "always", "lower-case"],
    "subject-full-stop": [1, "never", "."],
    "subject-case": [1, "never", ["upper-case"]],
    // Увеличенные лимиты длины для более свободного стиля
    "header-max-length": [1, "always", 100],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [1, "always", 100],
    "footer-leading-blank": [1, "always"],
  },
};
