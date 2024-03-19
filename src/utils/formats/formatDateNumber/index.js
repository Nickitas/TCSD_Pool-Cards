export const formatDateNumber = (value) => {

  let formattedValue = value.toString()?.replace(/\D/g, '');

  if (formattedValue.length > 2) {
    if (formattedValue.length >= 4) {
      formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2, 4)}.${formattedValue.slice(4, 8)}`;
    } else {
      formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2)}`;
    }
  }

  if (value.length < formattedValue.length) {
    formattedValue = formattedValue?.replace(/\.$/, '');
  }

  if (formattedValue.endsWith('.') && formattedValue.length < 7) {
    formattedValue = formattedValue.slice(0, formattedValue.length - 1);
  }

  return formattedValue;
}