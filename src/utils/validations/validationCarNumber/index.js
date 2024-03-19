export const validationCarNumber = (value) => {
    if (!value) {
        return 'Поле не может быть пустым';
    }

    // if (value.length > 3) {
    //     return 'Гос. номер автомобиля должен содержать не более 3 цифр';
    // }

    // const carNumberRegex = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui;
    // if (!carNumberRegex.test(value)) {
    //     return 'Неверный формат гос. номера автомобиля';
    // }

    return '';
};
