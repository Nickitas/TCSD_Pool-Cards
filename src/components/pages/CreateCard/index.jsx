import { useState, useEffect } from 'react';
import { createCardService } from '../../../../api';
import { useAlertStore } from '../../../../store/useAlertStore';
import { Title } from '../../ui/Title';
import { Form } from '../../ui/Form';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import cls from './index.module.scss';


const CreateCard = () => {
    const { setAlertState } = useAlertStore();

    const [formData, setFormData] = useState({
        cardKey: '',
        visitsNumber: '1',
        lastDate: '',
        fio: '',
        phoneNumber: '',
        carNumber: ''
    });

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
        setFormData({
            cardKey: '',
            visitsNumber: 1,
            lastDate: new Date(new Date().setDate(new Date().getDate() + 31)).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            fio: '',
            phoneNumber: '',
            carNumber: ''
        });
        setValid({
            cardKey: false,
            visitsNumber: true,
            lastDate: true,
            fio: false,
            phoneNumber: false,
            carNumber: false,
        });
    };

    const handleSubmit = async (e) => {
        const { cardKey, visitsNumber, lastDate, fio, phoneNumber, carNumber } = formData;
        const dateParts = lastDate.split('.');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const unixTimestamp = new Date(formattedDate).getTime() / 1000;

        e.preventDefault();
        try {
            createCardService(cardKey, visitsNumber, unixTimestamp, fio, phoneNumber, carNumber).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setAlertState({
                        isShow: true,
                        title: 'Пропуск создан!',
                        message: `Пропуск ${cardKey} ${fio && fio} на ${visitsNumber} посещений создан успешно по ${lastDate} включительно`
                    });
                    reset();
                } else {
                    setAlertState({
                        isShow: true,
                        title: `Пропуск не зарегистрирован в системе СКУД ДГТУ, но создан успешно!`,
                        message: `Пропуск ${cardKey} ${fio && fio} на ${visitsNumber} посещений создан успешно по ${lastDate} включительно`
                    });
                    reset();
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
                title: 'Системная ошибка создания',
                message: err
            });
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
                            type='fio'
                            placeholder={'Укажиет Ф.И.О...'}
                            clue='Вводится через пробел'
                            value={formData.fio}
                            onChange={(value) => setFormData(prev => ({ ...prev, fio: value }))}
                            isValid={(e) => {
                                setValid((prev) => ({ ...prev, fio: !e }));
                            }}
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
                            Создать
                        </Button>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default CreateCard;