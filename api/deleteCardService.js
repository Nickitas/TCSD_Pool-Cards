import { methodDefault } from './methodDefault';

export const deleteCardService = async (id) => methodDefault('/delete', {
    method: 'POST',
    body: JSON.stringify({ id })
});