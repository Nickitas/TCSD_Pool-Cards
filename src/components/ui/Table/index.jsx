import { useState } from 'react';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableHeadCell } from './TableHeadCell';
import { TableBodyCell } from './TableBodyCell';
import { EmptyCell } from './EmptyСell';
import { ShrinkOnIcon, ShrinkOffIcon } from '../svg.module';
import cls from './index.module.scss';


const ShrinkBtn = ({ shrink, setShrink }) => {
    
    const handlerShrinkpadding = () => {
        setShrink(e => !e);
        localStorage.setItem('shrink', !shrink);
    }

    return (
        <div className={cls.shrinkButton}  onClick={handlerShrinkpadding}>
            { shrink ?  <ShrinkOffIcon/> : <ShrinkOnIcon/> }
        </div>
    )
}

const Table = ({ children, ...props }) => {
    const [shrink, setShrink] = useState(localStorage.getItem('shrink'));

    const table = (
        <div className={cls.tableContainer}>
            <div className={cls.tableWrapper}>
                <ShrinkBtn shrink={shrink} setShrink={setShrink} />
                <table className={`${cls.table} ${shrink ?  `${cls.shrink}` : ''}`} {...props}>
                    { children }
                </table>
            </div>
        </div>
    )

    return table;
}

export { 
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeadCell,
    TableBodyCell,
    EmptyCell,
};