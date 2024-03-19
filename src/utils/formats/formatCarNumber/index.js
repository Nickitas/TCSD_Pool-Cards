export const formatCarNumber = (value) => {
    if (!value) {
        return '';
    }
  
    const cleanedValue = value.toString().toUpperCase().replace(/\s+/g, '');
    
    // const carNumberRegex = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui;
    // if (!carNumberRegex.test(cleanedValue)) {
    //     return value;
    // }
  
    const formattedValue = cleanedValue.replace(/^(.)(...)(..)$/, '$1 $2 $3');
    return value;
};