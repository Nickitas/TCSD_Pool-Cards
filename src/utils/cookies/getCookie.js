export const getCookie = (name, cookie) => {
    if (!cookie) {
        cookie = document.cookie
    }
    let matches = cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    const result = matches ? decodeURIComponent(matches[1]) : undefined;
    return result
}