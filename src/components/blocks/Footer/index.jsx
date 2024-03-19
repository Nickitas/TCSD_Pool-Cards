import { useState } from 'react';
import { Alert } from '../../ui/Alert';
import { Button } from '../../ui/Button';
import { InfoIcon, CopyIcon  } from '../../ui/svg.module';
import logo from '../../../../public/logo.svg';
import cls from './index.module.scss';


const Footer = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMess, setAlertMess] = useState('');


    const handleCopyTelegram = () => {
        setAlertMess('Напишите разработчику 💖');
        setAlertTitle('@Nidatsky');
        navigator.clipboard.writeText(alertTitle);
        setShowAlert(true);
    }

    const handleHowItsWork = () => {
        setAlertTitle('Как это работает?');
        setAlertMess('Веб-приложение, разработанно для управления электронными пропусками в бассеин ДГТУ');
        setShowAlert(true);
    }

    return (
        <footer className={cls.footer}>
           <div className='container'>
                <div className={cls.row}>
                    <h5 className={cls.logo}>
                        <img src={logo} alt='logo' />
                        <span>DSTU Pool Cards</span>
                    </h5>
                </div>
                <div className={cls.row}>
                
                    <div className={cls.list}>
                        <a className={cls.info} onClick={handleHowItsWork}>
                            <InfoIcon/>
                            Как это работает?
                        </a>
                        <div className={cls.copywrite}>
                            © Pool Cards from <b>CONTROL</b> 2024. All rights received.
                        </div>
                    </div>

                    <Button ico={<CopyIcon/>} onClick={handleCopyTelegram}>
                        Dev
                    </Button>
                
                </div>
           </div>

           <Alert 
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                title={alertTitle}
                message={alertMess}
            />

        </footer>
    );
};

export { Footer };