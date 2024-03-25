import { methodDefault } from './methodDefault';

export const editCardService = async (id, data) => methodDefault('/edit', {
    method: 'POST',
    body: JSON.stringify({ id, data})
});