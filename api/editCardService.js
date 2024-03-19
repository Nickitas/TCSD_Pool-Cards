import { methodDefault } from './methodDefault';

export const editCardService = async (cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber) => methodDefault('/card/edit', {
    method: 'POST',
    body: JSON.stringify({ cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber })
});