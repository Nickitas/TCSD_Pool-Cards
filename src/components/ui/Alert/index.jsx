import { useEffect } from 'react';
import { LightningIcon, CloseIcon } from '../svg.module';
import cls from './index.module.scss';


const Alert = ({ showAlert, setShowAlert, title, message }) => {

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 4_000);
    }, [showAlert]);

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    return (
        <div className={`${cls.alert} ${showAlert ? cls.animation : ''}`}>
            <div className={cls.icon}>
                <LightningIcon/>
            </div>
            <div className={cls.message}>
                <h5>{ title }</h5>
                <p>{ message }</p>
            </div>
            <div className={cls.close} onClick={handleCloseAlert}>
                <CloseIcon/>
            </div>
        </div>
    );
};

export { Alert };