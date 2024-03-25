import { useAlertStore } from '../../../../store/useAlertStore';
import { Alert } from '../../ui/Alert';
import { Button } from '../../ui/Button';
import { InfoIcon, CopyIcon  } from '../../ui/svg.module';
import logo from '../../../../public/media/logo.svg';
import cls from './index.module.scss';


const Footer = () => {
    const { alertState, setAlertState } = useAlertStore();

    const handleCopyTelegram = () => {
        setAlertState({
            isShow: true,
            title: '@NeDatsky',
            message: 'Напишите разработчику 💖'
        });
        navigator.clipboard.writeText(alertState.title);
    }

    const handleHowItsWork = () => {
        setAlertState({
            isShow: true,
            title: 'Как это работает?',
            message: 'Веб-приложение, разработанно для управления электронными пропусками через проезды шлакбаума в бассеин ДГТУ'
        });
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
                showAlert={alertState.isShow}
                setAlertState={setAlertState}
                title={alertState.title}
                message={alertState.message}
            />

        </footer>
    );
};

export { Footer };