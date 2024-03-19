import { useState, useEffect } from 'react';
import { NavLink, redirect } from 'react-router-dom';
import { useAuthStore } from '../../../../store/useAuthStore';
import { Button } from '../../ui/Button';
import { ThemeToggleBtn } from '../../ui/ThemeToggleBtn';
import { CogIcon, MenuIcon, CloseIcon } from '../../ui/svg.module';
import cls from './index.module.scss';


const Nav = () => {
    const { isAuth, setAuth } = useAuthStore();
    const [scroll, setScroll] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);

    const getScroll = () => {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    };

    useEffect(() => {
        const t = setInterval(() => {
          const [x, y] = getScroll()
          if (y > 200) {
            setScroll(true)
          } else {
            setScroll(false)
          }
        }, 20)
        return () => clearInterval(t)
    }, []);

    const handleMenuClick = () => {
        setOpenMenu(prev => !prev);
    }

    const handleLogOut = () => {
        setAuth(false);
        redirect('/auth');
    }

    const nav = (
        <nav className={cls.nav} data-nav={scroll}>
            <div className='container'>
                <div className={cls.row}>

                    <div className={cls.first}>
                        <NavLink to={'/create_card'}>
                            <div className={cls.brand}>
                                <CogIcon/>
                                <h6>Pool Cards</h6>
                            </div>
                        </NavLink>
                        
                        { isAuth && (
                        <ul className={cls.list}>
                                <li className={cls.item}>
                                    <NavLink to={'/create_card'}>Новый пропуск</NavLink>
                                </li>
                                <li className={cls.item}>
                                    <NavLink to={'/'}>Учет клиентов</NavLink>
                                </li>
                                {/* <li className={cls.item}>
                                    <NavLink to={'/statistics'}>Статистика</NavLink>
                                </li> */}
                        </ul>)}
                    </div>
                            
                    <div className={cls.controls}>
                        <ThemeToggleBtn />
                        { !isAuth ? (
                            <NavLink to={'/auth'}>
                                Войти
                            </NavLink>
                        ) : (
                            <Button onClick={handleLogOut}>
                                Выйти 
                            </Button>
                        ) }
                        <div className={cls.mobile}>
                            <div className={cls.menuButtonToggle} onClick={handleMenuClick}>
                                { isOpenMenu ? <CloseIcon/> : <MenuIcon/>}
                            </div>
                            <div className={`${cls.dropMenu} ${isOpenMenu ? cls.open : ''}`}>
                                <NavLink to={'/create_card'} onClick={ () => setOpenMenu(false)}>Новый пропуск</NavLink>
                                <NavLink to={'/'} onClick={ () => setOpenMenu(false)}>Список пользователей</NavLink>
                                {/* <NavLink to={'/statistics'} onClick={ () => setOpenMenu(false)}>Статистика</NavLink> */}
                            </div>
                        </div>  
                    </div>

                </div>  
            </div>
        </nav>
    );

    return nav;
};

export { Nav };