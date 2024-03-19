import cls from './index.module.scss';

const TableBody = ({ ...props }) => {
    return (
        <tbody className={cls.tbody} {...props}>
            { props.children }
        </tbody>
    );
};

export { TableBody };