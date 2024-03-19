export const validationEmail = (value) => {
    if (!value) {
      return 'Поле не может быть пустым';
    }
  
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Недопустимый формат e-mail';
    }
  
    return '';
};