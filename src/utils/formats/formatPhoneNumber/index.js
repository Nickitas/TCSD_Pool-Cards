export const formatPhoneNumber = (phoneNumber) => {
    let cleaned = ("" + phoneNumber).toString().replace(/\D/g, "");
    const maxLength = 11;

    if (cleaned.length > maxLength) {
        cleaned = cleaned.slice(0, maxLength);
    }

    let formattedNumber = "";

    if (cleaned.length > 0) {
        formattedNumber += "+7 (";
        if (!/^[78]$/.test(cleaned.charAt(0))) {
            formattedNumber += cleaned.charAt(0);
            cleaned = cleaned.slice(1);
        }
    }

    if (cleaned.length > 1) {
        formattedNumber += `${cleaned.slice(1, 4)}`;
    }

    if (cleaned.length > 4) {
        formattedNumber += `) ${cleaned.slice(4, 7)}`;
    }

    if (cleaned.length > 7) {
        formattedNumber += `-${cleaned.slice(7, 9)}`;
    }

    if (cleaned.length > 9) {
        formattedNumber += `-${cleaned.slice(9)}`;
    }

    return formattedNumber;
};  