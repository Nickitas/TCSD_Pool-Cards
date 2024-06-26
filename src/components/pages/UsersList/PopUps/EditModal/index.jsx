import { useState } from 'react';
import { editCardService } from '../../../../../../api';
import { useAlertStore } from '../../../../../../store/useAlertStore';
import { parseDateRuLocaleToUnixTs } from '../../../../../utils/functions';
import { ModalWindow, ModalHeader, ModalContent } from '../../../../ui/ModalWindow';
import { Form } from '../../../../ui/Form';
import { Input } from '../../../../ui/Input';
import { Button } from '../../../../ui/Button';
import cls from './index.module.scss';


const EditModal = ({
    item,
    setVisible
}) => {
    const { setAlertState } = useAlertStore();

    const [formData, setFormData] = useState({
        cardKey: item.cardKey,
        visitsNumber: item.amount,
        lastDate: item.date2,
        fio: item.fio,
        phoneNumber: item.phoneNumber,
        carNumber: item.carNumber,
    });

    const [isValid, setValid] = useState({
        cardKey: true,
        visitsNumber: true,
        lastDate: true,
        fio: true,
        phoneNumber: true,
        carNumber: true,
    });

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    const reset = () => {
       setFormData({
            cardKey: item.cardKey,
            visitsNumber: item.amount,
            lastDate: item.date2,
            fio: item.fio,
            phoneNumber: item.phoneNumber,
            carNumber: item.carNumber,
       })
        setValid({
            cardKey: true,
            visitsNumber: true,
            lastDate: true,
            fio: true,
            phoneNumber: true,
            carNumber: true,
        });
    };

    const handleSubmit = (e) => {
        const { cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber } = formData;

        e.preventDefault();
        try {
            editCardService(item._id, { 
                cardKey: cardKey,
                visitsNumber: Number(visitsNumber),
                lastDate: parseDateRuLocaleToUnixTs(lastDate),
                fio: fio,
                phoneNumber: phoneNumber, 
                carNumber: carNumber
             }).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setVisible(false);
                    setAlertState({
                        isShow: true,
                        title: 'Пропуск изменен!',
                        message: `Пропуск ${cardKey} ${fio && fio} на ${visitsNumber} посещений изменен успешно`
                    });
                    reset();
                    setVisible(false);
                } else {
                    setAlertState({
                        isShow: true,
                        title: 'Ошибка изменения!',
                        message: response.body,
                    });
                }
                setServerResponse(-1);
                setShowServerErrorMessage(false);

            }).catch(err => {
                setAlertState({
                    isShow: true,
                    title: 'Ошибка выполнения запроса!',
                    message: err
                });
                console.error(err);
            });

        } catch (err) {
            setAlertState({
                isShow: true,
                title: 'Системная ошибка при изменении данных',
                message: err
            });
            console.error(err);
            reset();
        }
    }

    const editModal = (
        <>
            <ModalWindow setVisible={() => setVisible(false)}>
                <ModalHeader setVisible={() => setVisible(false)}>
                    Редактирование
                </ModalHeader>
                <ModalContent>
                    <div className={cls.editModal}>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                id={1}
                                type='cardNumber'
                                placeholder={'Приложите эл. карточку...'}
                                clue='Вводится по средствам считывателя'
                                autoFocus
                                value={formData.cardKey}
                                onChange={(value) => setFormData(prev => ({ ...prev, cardKey: value }))}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, cardKey: !e }));
                                }}
                            />
                            <Input
                                id={2}
                                type='amount'
                                placeholder={'Укажите кол-во посещений...'}
                                clue='Целое простое число от 1 до 31'
                                value={formData.visitsNumber}
                                onChange={(value) => setFormData(prev => ({ ...prev, visitsNumber: value }))}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, visitsNumber: !e }));
                                }}
                            />
                            <Input
                                id={3}
                                type='date'
                                placeholder={'Укажите дату, до которой пропуск действителен...'}
                                clue='Вводится в формате дд.мм.гггг'
                                value={formData.lastDate}
                                onChange={(value) => setFormData(prev => ({ ...prev, lastDate: value }))}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, lastDate: !e }));
                                }}
                            />
                            <Input
                                id={4}
                                type='text'
                                placeholder={'Укажиет Ф.И.О...'}
                                clue='Вводится через пробел'
                                value={formData.fio}
                                onChange={(value) => setFormData(prev => ({ ...prev, fio: value }))}
                            />
                            <Input
                                id={5}
                                type='phoneNumber'
                                placeholder={'Укажите номер телефона...'}
                                clue='Вводится без кода страны (+ 7 или 8)'
                                value={formData.phoneNumber}
                                onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, phoneNumber: !e }));
                                }}
                            />
                            <Input
                                id={6}
                                type='carNumber'
                                placeholder={'Укажите номер автомобиля...'}
                                clue='Вводится в произвольном формате'
                                value={formData.carNumber}
                                onChange={(value) => setFormData(prev => ({ ...prev, carNumber: value }))}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, carNumber: !e }));
                                }}
                                responseCode={serverResponse}
                                setServerResponse={setServerResponse}
                                showServerErrorMessage={showServerErrorMessage}
                                setShowServerErrorMessage={setShowServerErrorMessage}
                            />
                            <Button type={'submit'} disabled={
                                !isValid.cardKey ||
                                !isValid.visitsNumber ||
                                !isValid.lastDate ||
                                !isValid.fio ||
                                !isValid.phoneNumber ||
                                !isValid.carNumber
                            }>
                                Принять изменения
                            </Button>
                        </Form>
                    </div>
                </ModalContent>
            </ModalWindow>
        </>
    );

    return editModal;
};

export { EditModal };