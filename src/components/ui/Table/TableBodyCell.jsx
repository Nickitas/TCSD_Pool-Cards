import cls from './index.module.scss';

const TableBodyCell = ({ ...props }) => {
    return (
        <td className={cls.tbodyCell} {...props}>
            { props.children }
        </td>
    );
};

export { TableBodyCell };