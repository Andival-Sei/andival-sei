module.exports = {
  // Линтинг и форматирование TypeScript/JavaScript файлов
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  // Форматирование других файлов
  '**/*.{json,scss,css,md,yml,yaml}': ['prettier --write'],
};
