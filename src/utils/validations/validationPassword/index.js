import zxcvbn from 'zxcvbn';

const unsafePasswords = [
  'password',
  'password1',
  '00000000',
  '12345678',
  'qwerty',
  'qwerty123',
  'admin',
  'root123',
  'admin123',
  'letmein',
  'letmein123',
  '11111111',
  '123456789',
  'abc12345',
  '12341234',
  'iloveyou',
  'welcome',
  'monkey',
  'sunshine',
  'princess',
  'football',
  'baseball',
  'superman',
  'dragon12',
  '1234567890',
  '987654321',
  'master123',
];

export const validationPassword = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  if (value.length < 8) {
    return 'Минимальная длина пароля - 8 символов';
  }

  // const russianAlphabetRegex = /[а-яА-Я]/; с пробелами
  const russianAlphabetRegex = /[а-яА-Я\s]/; // пробелы запрещены
  if (russianAlphabetRegex.test(value)) {
    return 'Недопустимые символы';
  }

  const digitRegex = /\d/;
  if (!digitRegex.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  const specialCharacterRegex = /[-_!@#$%^&*]/;
  if (!specialCharacterRegex.test(value)) {
    return 'Пароль должен содержать хотя бы один специальный символ';
  }

  if (unsafePasswords.includes(value.toLowerCase())) {
    return 'Пароль слишком простой или опасный';
  }

  const passwordStrength = zxcvbn(value).score;
  if (passwordStrength < 3) {
    return 'Слабый пароль';
  }

  return '';
};