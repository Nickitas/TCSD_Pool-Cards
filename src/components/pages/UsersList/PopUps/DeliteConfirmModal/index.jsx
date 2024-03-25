import { useState } from 'react';
import { deleteCardService } from '../../../../../../api';
import { useAlertStore } from '../../../../../../store/useAlertStore';
import { ModalWindow, ModalHeader, ModalContent } from '../../../../ui/ModalWindow';
import { Form } from '../../../../ui/Form';
import { Input } from '../../../../ui/Input';
import { Button } from '../../../../ui/Button';
import { Alert } from '../../../../ui/Alert';
import cls from './index.module.scss';


const DeleteConfirmModal = ({
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
            deleteCardService(item._id).then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setAlertState({
                        isShow: true,
                        title: 'Пропуск удален!',
                        message: `Пропуск ${item.cardKey} ${item.fio && item.fio} удален успешно`
                    });
                    reset();
                    setVisible(false);
                } else {
                    setAlertState({
                        isShow: true,
                        title: 'Ошибка удаления!',
                        message: 'Повторите действия повторно'
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

    const deleteConfirmModal = (
        <>
            <ModalWindow setVisible={() => setVisible(false)}>
                <ModalHeader setVisible={() => setVisible(false)}>
                    Удаление
                </ModalHeader>
                <ModalContent>
                    <div className={cls.deleteConfirmModal}>
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

    return deleteConfirmModal;
};

export { DeleteConfirmModal };