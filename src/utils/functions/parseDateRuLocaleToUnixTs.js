export const parseDateRuLocaleToUnixTs = (dateString) => {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const unixTimestamp = Math.round(new Date(year, month, day).getTime() / 1000); // Делим на 1000 для получения в секундах

    return unixTimestamp;
}