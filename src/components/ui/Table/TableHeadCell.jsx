import { useState } from 'react';
import { ArrowSolidIcon } from '../svg.module';
import cls from './index.module.scss'

const TableHeadCell = ({ sortabl, ...props }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <th className={cls.theadCell} data-sortabl={sortabl?.toString()} {...props}>
            <p className={cls.line} onClick={() => setToggle(e => !e)}>
                <span>{props.children}</span>
                { sortabl && (
                    <span className={toggle ? `${cls.icon} ${cls.iconRot}` : `${cls.icon}`}>
                        <ArrowSolidIcon />
                    </span>
                )}
            </p>
        </th>
    );
};

export { TableHeadCell };