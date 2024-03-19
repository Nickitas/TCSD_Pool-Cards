import { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { authServise } from '../../../../api';
import { useAuthStore } from '../../../../store/useAuthStore';
import { Title } from '../../ui/Title';
import { Form } from '../../ui/Form';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import cls from './index.module.scss';


const LOGIN = 'pool1';
const PASSWORD = 'poolpasskey#1';

const LOGIN_ADMIN = 'admin';
const PASSWORD_ADMIN = 'Viceter_1612';

const Auth = () => {
    const { setAuth, loadAuth, setLoad } = useAuthStore();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState(1);

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMess, setAlertMess] = useState('');

    const [isValid, setValid] = useState({
        login: false,
        password: false,
    });

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        setLogin('');
        setPassword('');
        setValid({
            login: false,
            password: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // authServise(login, password).then(response => {
            //     setServerResponse(response._code);
            //     if (response.state) {
            //         setShowAlert(true);
            //         reset();
            //     } else {
            //         setShowAlert(true);
            //         setAlertTitle('Ошибка входа!');
            //         setAlertMess(err);
            //     }
            //     setServerResponse(-1);
            //     setShowServerErrorMessage(false);

            // }).catch(err => {
            //     setShowAlert(true);
            //     setAlertTitle('Ошибка выполнения запроса!');
            //     setAlertMess(err);
            //     console.error(err);
            // });
            setLoad(true);
            if (!((login === LOGIN && password === PASSWORD) || (login === LOGIN_ADMIN && password === PASSWORD_ADMIN))) {
                setAuth(false);
                setShowAlert(true);
                setAlertTitle('Ошибка входа!');
                setAlertMess('Неверный логин или пароль. Попробуйте снова');
                redirect("/new_card");
            } else {
                setAuth(true);
                setShowAlert(true);
                setAlertTitle('Успешно!');
                setAlertMess('Авторизация пройдена');
                setServerResponse(-1);
                setShowServerErrorMessage(false);
                reset();
            }
        } catch (err) {
            setAuth(false);
            setShowAlert(true);
            setAlertTitle('Системная ошибка');
            setAlertMess(err);
            console.error(err);
            reset();
        }
        setLoad(false);
    }

    return (
        <section className={cls.auth}>
            <div className='container'>
                <div className={cls.frame}>
                    <Title type='h1' align='center'>Авторизация</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            id={1}
                            type='text'
                            placeholder={'Укажите Ваш логин...'}
                            autoFocus
                            value={login}
                            onChange={(value) => setLogin(value)}
                            isValid={(e) => {
                                setValid((prev) => ({ ...prev, login: !e }));
                            }}
                        />
                        <Input
                            id={2}
                            type='password'
                            placeholder={'Укажите Ваш пароль...'}
                            value={password}
                            onChange={(value) => setPassword(value)}
                            isValid={(e) => {
                                setValid((prev) => ({ ...prev, password: !e }));
                            }}
                            responseCode={serverResponse}
                            setServerResponse={setServerResponse}
                            showServerErrorMessage={showServerErrorMessage}
                            setShowServerErrorMessage={setShowServerErrorMessage}
                        />
                        <Button type={'submit'} disabled={
                            !isValid.login ||
                            !isValid.password
                        }>
                            Войти
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

export default Auth;