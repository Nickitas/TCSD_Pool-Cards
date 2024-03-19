
export const validationDefault = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  return '';
}