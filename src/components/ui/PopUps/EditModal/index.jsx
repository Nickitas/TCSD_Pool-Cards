import { useState } from 'react';
import { editCardService } from '../../../../../api';
import { ModalWindow, ModalHeader, ModalContent } from "../../ModalWindow";
import { Form } from '../../Form';
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Alert } from '../../Alert';
import cls from './index.module.scss';


const EditModal = ({
    item,
    setVisible
}) => {
    const [cardKey, setCardKey] = useState(item.cardKey);
    const [visitsNumber, setVisitsNumber] = useState(item.amount);
    const [lastDate, setLastDate] = useState(item.date2);
    const [fio, setFio] = useState(item.fio);
    const [phoneNumber, setPhoneNumber] = useState(item.phoneNumber);
    const [carNumber, setCarNumber] = useState(item.carNumber);

    const [isValid, setValid] = useState({
        cardKey: false,
        visitsNumber: false,
        lastDate: false,
        phoneNumber: false,
        carNumber: false,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMess, setAlertMess] = useState('');

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    const reset = () => {
        setCardKey('');
        setVisitsNumber('');
        setLastDate('');
        setFio('');
        setPhoneNumber('');
        setCarNumber('');
        setValid({
            cardKey: false,
            visitsNumber: false,
            lastDate: false,
            phoneNumber: false,
            carNumber: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            editCardService(cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setShowAlert(true);
                    setAlertTitle('Пропуск изменен!');
                    setAlertMess(`Пропуск ${item.cardKey} ${item.fio && item.fio} на ${item.visitsNumber} посещений изменен успешно`);
                    setVisible(false);
                    reset();
                } else {
                    setShowAlert(true);
                    setAlertTitle('Ошибка изменения!');
                    setAlertMess(err);
                }
                setServerResponse(-1);
                setShowServerErrorMessage(false);

            }).catch(err => {
                setShowAlert(true);
                setAlertTitle('Ошибка выполнения запроса!');
                setAlertMess(err);
                console.error(err);
            });

        } catch (err) {
            setShowAlert(true);
            setAlertTitle('Системная ошибка');
            setAlertMess(err);
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
                                value={cardKey}
                                onChange={(value) => setCardKey(value)}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, cardKey: !e }));
                                }}
                            />
                            <Input
                                id={2}
                                type='amount'
                                placeholder={'Укажите кол-во посещений...'}
                                clue='Целое простое число от 1 до 31'
                                value={visitsNumber}
                                onChange={(value) => setVisitsNumber(value)}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, visitsNumber: !e }));
                                }}
                            />
                            <Input
                                id={3}
                                type='date'
                                placeholder={'Укажите дату, до которой пропуск действителен...'}
                                clue='Вводится в формате дд.мм.гггг'
                                value={lastDate}
                                onChange={(value) => setLastDate(value)}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, lastDate: !e }));
                                }}
                            />
                            <Input
                                id={4}
                                type='text'
                                placeholder={'Укажиет Ф.И.О...'}
                                clue='Вводится через пробел. Не является обязательным'
                                value={fio}
                                onChange={(value) => setFio(value)}
                            />
                            <Input
                                id={5}
                                type='phoneNumber'
                                placeholder={'Укажите номер телефона...'}
                                clue='Вводится без кода страны (+ 7 или 8)'
                                value={phoneNumber}
                                onChange={(value) => setPhoneNumber(value)}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, phoneNumber: !e }));
                                }}
                            />
                            <Input
                                id={6}
                                type='carNumber'
                                placeholder={'Укажите номер автомобиля...'}
                                clue='Вводится только цифры номера'
                                value={carNumber}
                                onChange={(value) => setCarNumber(value)}
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
                                !isValid.phoneNumber ||
                                !isValid.carNumber
                            }>
                                Изменить
                            </Button>
                        </Form>
                    </div>
                </ModalContent>
            </ModalWindow>

            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                title={alertTitle}
                message={alertMess}
            />
        </>
    );

    return editModal;
};

export { EditModal };