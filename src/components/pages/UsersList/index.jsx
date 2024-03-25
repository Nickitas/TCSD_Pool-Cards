import { useState, useEffect } from 'react';
import { getCardsListService } from '../../../../api';
import { parseUnixTsToRuLocale } from '../../../utils/functions';
import { Title } from '../../ui/Title';
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableBodyCell, EmptyCell } from '../../ui/Table';
import { EditModal } from './PopUps/EditModal';
import { DeleteConfirmModal } from './PopUps/DeliteConfirmModal';
import { SearchInput } from '../../ui/SearchInput';
import { Loader } from '../../ui/Loader';
import { EditIcon, TrashIcon } from '../../ui/svg.module';
import cls from './index.module.scss'


const UsersList = () => {
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const [queryText, setQueryText] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    const [isOpenEditModal, setOpenEditModal] = useState(false);
    const [isOpenDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

    let timeout;

    const fetchData = async () => {
        try {
            const response = await getCardsListService();
            setServerResponse(response._code);
            if (response.state) {
                setData(response.data.map(e => ({
                    _id: e._id,
                    date1: e.createDate !== undefined ? parseUnixTsToRuLocale(e.createDate) : "-",
                    date2: parseUnixTsToRuLocale(e.lastDate),
                    amount: e.visitsNumber,
                    fio: e.fio,
                    cardKey: e.cardKey,
                    status: e.status,
                    phoneNumber: e.phoneNumber,
                    carNumber: e.carNumber
                })));
                setLoading(false);
            } else {
                setLoading(true);
                console.error('Данные не были получены');
            }
            setServerResponse(-1);
            setShowServerErrorMessage(false);
        } catch (err) {
            setLoading(true);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fetchData();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [data]);

    const filteredByDate = queryText.length ? data.filter(e => e.cardKey.includes(queryText)) : data;

    const handleClickSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = filteredByDate.slice().sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                return sortDirection === 'asc' ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
            } else {
                return sortDirection === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
            }
        }

        return 0;
    });

    const handleEdit = (obj) => {
        setOpenEditModal(true);
        setItemData(obj);
    }

    const handleDelete = (obj) => {
        setOpenDeleteConfirmModal(true);
        setItemData(obj);
    }


    return (
        <section className={cls.usersList}>
            <div className='container'>
                <div className={cls.frame}>
                    <Title type='h1'>Учет клиентов</Title>
                    <div className={cls.controls}>
                        <SearchInput placeholder='Поиск по карте...'
                            onChange={e => setQueryText(_ => e.target.value)}
                        />
                    </div>
                    <div className={cls.tableWrapper}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>№</TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('date1')}>
                                            Дата создания
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('date2')}>
                                            Крайнее посещение
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('amount')}>
                                            Кол-во посещений
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('fio')}>
                                            Ф.И.О.
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('cardKey')}>
                                            Пропуск
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('status')}>
                                            Статус
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('phoneNumber')}>
                                            Номер телефона
                                        </TableHeadCell>
                                        <TableHeadCell sortabl onClick={() => handleClickSort('carNumber')}>
                                            Номерной знак
                                        </TableHeadCell>
                                        <TableHeadCell>Править</TableHeadCell>
                                        <TableHeadCell>Удалить</TableHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedData.length ? (
                                        sortedData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableBodyCell>
                                                    <b data-active={row.status}>
                                                        {index + 1}
                                                    </b>
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.date1}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.date2}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.amount}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.fio}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.cardKey}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.status ? 'Активен' : 'Не активен'}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.phoneNumber}
                                                </TableBodyCell>
                                                <TableBodyCell>
                                                    {row.carNumber}
                                                </TableBodyCell>
                                                <TableBodyCell data-green onClick={() => handleEdit(row)}>
                                                    <EditIcon />
                                                </TableBodyCell>
                                                <TableBodyCell data-red onClick={() => handleDelete(row)}>
                                                    <TrashIcon />
                                                </TableBodyCell>
                                            </TableRow>
                                        ))) : queryText ? (
                                            <EmptyCell>
                                                <TableBodyCell>Нет результатов</TableBodyCell>
                                            </EmptyCell>
                                        ) : null}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>

            {isOpenEditModal && (
                <EditModal
                    item={itemData}
                    setVisible={setOpenEditModal}
                />
            )}

            {isOpenDeleteConfirmModal && (
                <DeleteConfirmModal
                    item={itemData}
                    setVisible={setOpenDeleteConfirmModal}
                />
            )}

        </section>
    );
};

export default UsersList;