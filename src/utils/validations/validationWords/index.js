export const validationWords = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  if (value.length < 3) {
    return 'Значение не может быть меньше 3 символов';
  }

  const wordsRegex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!wordsRegex.test(value)) {
    return 'Недопустимые символы';
  }

  return '';
};