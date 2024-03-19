export const validationAmount = (value) => {
  
  if (typeof value !== 'string') {
    value = String(value);
  }

  if (!value) {
    return 'Поле не может быть пустым';
  }

  const amountRegex = /^(?!0)(?=.*\d)\d{1,3}(?: \d{3})*(?:,\d{2})?$/;
  if (!amountRegex.test(value)) {
    return 'Недопустимые символы';
  }

  const numericValue = value?.replace(/[^\d]/g, '');
  const amount = parseInt(numericValue);

  if (amount < 1 || amount > 31) {
    return 'Число может быть от 1 до 31';
  }

  return '';
}