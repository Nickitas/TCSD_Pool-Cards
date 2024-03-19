import { useState, useEffect } from 'react';
import { createCardService } from '../../../../api';
import { Title } from '../../ui/Title';
import { Form } from '../../ui/Form';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import cls from './index.module.scss';


const CreateCard = () => {
    const [cardKey, setCardKey] = useState('');
    const [visitsNumber, setVisitsNumber] = useState(1);
    const [lastDate, setLastDate] = useState('');
    const [fio, setFio] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [carNumber, setCarNumber] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMess, setAlertMess] = useState('');

    const [isValid, setValid] = useState({
        cardKey: false,
        visitsNumber: false,
        lastDate: false,
        phoneNumber: false,
        carNumber: false,
    });

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    useEffect(() => {
       reset();
      }, []);

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
            createCardService(cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setShowAlert(true);
                    setAlertTitle('Пропуск создан!');
                    setAlertMess(`Пропуск ${cardKey} ${fio && fio} на ${visitsNumber} посещений создан успешно по ${lastDate} включительно`);
                    reset();
                } else {
                    setShowAlert(true);
                    setAlertTitle('Ошибка создания!');
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

    return (
        <section className={cls.createCard}>
            <div className='container'>
                <div className={cls.frame}>
                    <Title type='h1'>Создать пропуск</Title>
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
                            Создать
                        </Button>
                    </Form>
                </div>
            </div>
            
            <Alert 
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                title={alertTitle}
                message={alertMess}
            />

        </section>
    );
};

export default CreateCard;