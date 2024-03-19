export const validationCardNumber = (value) => {
    if (!value) {
      return 'Поле не может быть пустым';
    }
  
    const cardNumberRegex = /^[0-9A-Fa-f]{12}$/;
    if (!cardNumberRegex.test(value)) {
      return 'Код карты имеет некорректный формат';
    }
  
    return '';
};