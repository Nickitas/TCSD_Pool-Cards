import cls from './index.module.scss';

const TableHead = ({ ...props }) => {
    return (
        <thead className={cls.thead} {...props}>
            { props.children }
        </thead>
    );
};

export { TableHead };