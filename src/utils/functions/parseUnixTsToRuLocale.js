

export const parseUnixTsToRuLocale = (ts) => {
    const date = new Date(ts * 1000); // Умножаем на 1000, чтобы перевести секунды в миллисекунды

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}