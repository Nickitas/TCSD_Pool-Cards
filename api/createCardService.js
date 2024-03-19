import { methodDefault } from './methodDefault';

export const createCardService = async (cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber) => methodDefault('', {
    method: 'POST',
    body: JSON.stringify({ cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber })
});