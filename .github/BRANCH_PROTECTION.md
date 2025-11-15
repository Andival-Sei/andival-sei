# Рекомендации по защите веток в GitHub

Этот файл содержит рекомендации по настройке защиты веток `main` и `develop` в GitHub.

## 🔒 Защита ветки `main`

Рекомендуется настроить следующие правила для ветки `main`:

### Обязательные проверки

- ✅ **Require pull request reviews before merging**
  - Требуется минимум 1 одобрение (Approval)
  - Можно включить "Dismiss stale pull request approvals when new commits are pushed"

- ✅ **Require status checks to pass before merging**
  - Включить проверки: `lint`, `type-check`, `test` (если настроен CI/CD)
  - Включить "Require branches to be up to date before merging"

- ✅ **Require conversation resolution before merging**
  - Все комментарии в PR должны быть решены перед мерджем

- ✅ **Do not allow bypassing the above settings**
  - Даже администраторы не могут обходить эти правила

- ✅ **Require linear history**
  - Предотвращает merge commits, требует rebase

- ✅ **Restrict who can push to matching branches**
  - Никто не может пушить напрямую (только через PR)

### Опционально

- ✅ **Include administrators**
  - Применить правила и к администраторам

## 🔒 Защита ветки `develop`

Рекомендуется настроить следующие правила для ветки `develop`:

### Обязательные проверки

- ✅ **Require pull request reviews before merging**
  - Требуется минимум 1 одобрение (Approval)
  - Можно включить "Dismiss stale pull request approvals when new commits are pushed"

- ✅ **Require status checks to pass before merging**
  - Включить проверки: `lint`, `type-check`, `test` (если настроен CI/CD)
  - Включить "Require branches to be up to date before merging"

- ✅ **Require conversation resolution before merging**
  - Все комментарии в PR должны быть решены перед мерджем

- ✅ **Do not allow bypassing the above settings**
  - Даже администраторы не могут обходить эти правила

- ✅ **Restrict who can push to matching branches**
  - Никто не может пушить напрямую (только через PR)

### Опционально

- ✅ **Allow force pushes** - НЕ включать (может быть опасно)
- ✅ **Allow deletions** - НЕ включать
- ✅ **Include administrators** - Применить правила и к администраторам

## 📋 Настройка в GitHub

1. Перейдите в **Settings** → **Branches**
2. Нажмите **Add branch protection rule**
3. Введите имя ветки: `main` или `develop`
4. Настройте правила согласно рекомендациям выше
5. Сохраните правило

## 🔄 Автоматическое удаление веток после мерджа

Чтобы ветки автоматически удалялись после мерджа PR:

1. Перейдите в **Settings** → **Pull Requests**
2. Включите **Automatically delete head branches** после мерджа PR

## ✅ Результат

После настройки:

- ❌ Никто не сможет пушить напрямую в `main` или `develop`
- ✅ Все изменения только через Pull Request
- ✅ Все PR требуют одобрения и прохождения проверок
- ✅ Ветки фич автоматически удаляются после мерджа
