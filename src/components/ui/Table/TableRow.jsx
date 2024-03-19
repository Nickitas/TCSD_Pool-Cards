import cls from './index.module.scss';

const TableRow = ({ ...props }) => {
    return (
        <tr className={cls.tableRow} {...props}>
            { props.children }
        </tr>
    );
};

export { TableRow };