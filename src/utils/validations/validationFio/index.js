export const validationFio = (value) => {
    if (!value) {
        return 'Поле не может быть пустым';
    }

    if (value.length < 3) {
        return 'Значение не может быть меньше 3 символов';
    }

    const fioRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    if (!fioRegex.test(value)) {
        return 'Недопустимые символы';
    }

    return '';
}