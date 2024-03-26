import { Title } from '../../ui/Title';
import none from '../../../../public/media/none.jpg';
import cls from './index.module.scss'


const Unauthorized = () => {

    return (
        <section className={cls.unauthorized}>
            <div className='container'>
                <div className={cls.frame}>
                    <Title type='h1'>Аутентификация в системе не пройдена</Title>
                    <p>
                        Для входа в систему воспользуйтесь кнопеой "Войти" в правом верхнем углу панели приложения. После чего введите авторизационные данные для входа
                    </p>
                    <img src={none} alt='Картинка' />
                </div>
            </div>
        </section>
    );
};

export default Unauthorized;