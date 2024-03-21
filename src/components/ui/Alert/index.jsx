import { useEffect } from 'react';
import { useAlertStore } from '../../../../store/useAlertStore';
import { LightningIcon, CloseIcon } from '../svg.module';
import cls from './index.module.scss';


const Alert = () => {
    const { alertState, setAlertState } = useAlertStore();

    useEffect(() => {
        setTimeout(() => {
            setAlertState({ isShow: false, title: '', message: '' });
        }, 4_000);
    }, [alertState.isShow]);

    const handleCloseAlert = () => {
        setAlertState({
            isShow: false,
            title: '',
            message: ''
        });
    }

    return (
        <div className={`${cls.alert} ${alertState.isShow ? cls.animation : ''}`}>
            <div className={cls.icon}>
                <LightningIcon/>
            </div>
            <div className={cls.message}>
                <h5>{ alertState.title }</h5>
                <p>{ alertState.message }</p>
            </div>
            <div className={cls.close} onClick={handleCloseAlert}>
                <CloseIcon/>
            </div>
        </div>
    );
};

export { Alert };