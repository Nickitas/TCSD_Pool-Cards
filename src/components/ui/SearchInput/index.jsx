import { SearchIcon } from '../svg.module';
import cls from './index.module.scss';

const SearchInput = ({ ...props }) => {

    const searchInput = (
        <div className={cls.search}>
            <div className={cls.icon}>
                <SearchIcon/>
            </div>
            <input className={cls.input}
                {...props}
            />
        </div>
    );

    return searchInput;
};

export { SearchInput };