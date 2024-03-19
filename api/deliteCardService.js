import { methodDefault } from './methodDefault';

export const deliteCardService = async (id) => methodDefault('/card/delite', {
    method: 'POST',
    body: JSON.stringify({ id })
});