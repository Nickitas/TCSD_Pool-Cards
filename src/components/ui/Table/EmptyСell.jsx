import cls from './index.module.scss';

const EmptyCell = ({ children }) => {

    const emptyCell = (
        <tr className={cls.emptyCell}>
            { children }
        </tr>
    );

    return emptyCell;
};

export { EmptyCell };