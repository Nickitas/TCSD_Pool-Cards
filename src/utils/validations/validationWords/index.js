export const validationWords = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  const wordsRegex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!wordsRegex.test(value)) {
    return 'Недопустимые символы';
  }

  return '';
};