export const foramtFio = (value) => {
    if (!value) {
        return '';
    }

    return value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}