import { useState } from 'react';
import { deliteCardService } from '../../../../../api';
import { ModalWindow, ModalHeader, ModalContent } from "../../ModalWindow";
import { Form } from '../../Form';
import { Input } from '../../Input';
import { Button } from "../../Button";
import { Alert } from '../../Alert';
import cls from './index.module.scss';


const DeliteConfirmModal = ({
    item,
    setVisible
}) => {
    const [confirm, setConfirm] = useState('');
    const [isValid, setValid] = useState({
        confirm: false,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMess, setAlertMess] = useState('');

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    const reset = () => {
        setConfirm('');
        setValid({
            confirm: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            deliteCardService(item.id).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setShowAlert(true);
                    setAlertTitle('Пропуск удален!');
                    setAlertMess(`Пропуск ${item.cardKey} ${item.fio && item.fio} удален успешно`);
                    reset();
                } else {
                    setShowAlert(true);
                    setAlertTitle('Ошибка удаления!');
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

    const deliteConfirmModal = (
        <>
            <ModalWindow setVisible={() => setVisible(false)}>
                <ModalHeader setVisible={() => setVisible(false)}>
                    Удаление
                </ModalHeader>
                <ModalContent>
                    <div className={cls.deliteConfirmModal}>
                        <Form onSubmit={handleSubmit}>
                            <p>
                                Для подтверждения удаления пропуска пропишите в текстовое поле слово "да" и нажмите на кнопку "Подтверждаю".
                            </p>
                            <Input
                                id={6}
                                type='text'
                                placeholder={'Подтвердите действия...'}
                                clue='Вводится слово "да"'
                                value={confirm}
                                onChange={(value) => setConfirm(value)}
                                isValid={(e) => {
                                    setValid((prev) => ({ ...prev, confirm: !e }));
                                }}
                                responseCode={serverResponse}
                                setServerResponse={setServerResponse}
                                showServerErrorMessage={showServerErrorMessage}
                                setShowServerErrorMessage={setShowServerErrorMessage}
                            />
                            <Button type={'submit'} disabled={
                                !isValid.confirm || confirm !== 'да'
                            }>
                                Подтверждаю
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

    return deliteConfirmModal;
};

export { DeliteConfirmModal };