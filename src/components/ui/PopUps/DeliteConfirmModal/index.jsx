import { useState } from 'react';
import { deliteCardService } from '../../../../../api';
import { useAlertStore } from '../../../../../store/useAlertStore';
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
    const { setAlertState } = useAlertStore();

    const [confirm, setConfirm] = useState('');
    const [isValid, setValid] = useState({
        confirm: false,
    });

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
                    setAlertState({
                        isShow: true,
                        title: 'Пропуск удален!',
                        message: `Пропуск ${item.cardKey} ${item.fio && item.fio} удален успешно`
                    });
                    reset();
                } else {
                    setAlertState({
                        isShow: true,
                        title: 'Ошибка удаления!',
                        message: err
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
                title: 'Системная ошибка удаления',
                message: err
            });
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

            <Alert />
        </>
    );

    return deliteConfirmModal;
};

export { DeliteConfirmModal };