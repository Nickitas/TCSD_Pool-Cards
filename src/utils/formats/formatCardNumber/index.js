export const formatCardNumber = (value) => {
    const cleanedValue = value.toString()?.replace(/\W/g, '');
  
    // if (cleanedValue.length !== 12 || !/^[0-9A-F]+$/.test(cleanedValue)) {
    //     return 'Формат кода карты нарушен'; 
    // }
  
    // let formattedValue = '';
    // for (let i = 0; i < cleanedValue.length; i += 2) {
    //   const chunk = cleanedValue.substr(i, 2);
    //   formattedValue += chunk;
    // }
  
    // return formattedValue;
    return cleanedValue;
  };