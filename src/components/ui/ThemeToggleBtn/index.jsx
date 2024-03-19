
import { useTheme } from '../../../hooks/useTheme';
import { SunIcon, MoonIcon } from '../svg.module';
import cls from './index.module.scss';

const ThemeToggleBtn = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={cls.theme_toggle_btn} onClick={toggleTheme}>
            { theme === 'dark' ? <MoonIcon /> : <SunIcon /> }
        </div>
    );
};

export { ThemeToggleBtn };