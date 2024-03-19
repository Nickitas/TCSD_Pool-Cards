export const validationDate = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!dateRegex.test(value)) {
    return 'Некорректный формат даты';
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Обнуляем время, чтобы учитывать только дату

  const year = parseInt(value.substring(6), 10);
  const month = parseInt(value.substring(3, 5), 10);
  const day = parseInt(value.substring(0, 2), 10);

  const minAllowedDate = new Date(currentDate);
  minAllowedDate.setDate(minAllowedDate.getDate() - 1); // Вчерашняя дата
  minAllowedDate.setHours(0, 0, 0, 0);

  const maxAllowedDate = new Date(currentDate);
  maxAllowedDate.setMonth(maxAllowedDate.getMonth() + 3);
  maxAllowedDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(year, month - 1, day);
  inputDate.setHours(0, 0, 0, 0); // Обнуляем время, чтобы учитывать только дату

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    inputDate < currentDate || // Сравниваем введенную дату с текущей датой (без времени)
    inputDate > maxAllowedDate
  ) {
    return 'Дата не может быть вчерашней или превышать три месяца от текущей';
  }

  return '';
};