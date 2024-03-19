export const formatAmount = (value) => {
  const cleanedValue = value.toString()?.replace(/\D/g, '');
  let formattedValue = '';

  for (let i = cleanedValue.length - 1; i >= 0; i--) {
    const digit = cleanedValue[i];
    const insertSpace = (cleanedValue.length - i - 1) % 3 === 0 && i !== cleanedValue.length - 1;

    if (insertSpace) {
      formattedValue = ' ' + formattedValue;
    }

    formattedValue = digit + formattedValue;
  }

  return formattedValue.trim();
}