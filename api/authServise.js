import { methodDefault } from './methodDefault';

export const authServise = async (login, password) => methodDefault('/login', {
    method: 'POST',
    body: JSON.stringify({ login, password })
});