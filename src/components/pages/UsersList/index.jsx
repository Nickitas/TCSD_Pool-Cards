import { useState, useEffect } from 'react';
import { getCardsListService } from '../../../../api';
import { Title } from '../../ui/Title';
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableBodyCell, EmptyCell } from '../../ui/Table';
import { EditModal } from '../../ui/PopUps/EditModal';
import { DeliteConfirmModal } from '../../ui/PopUps/DeliteConfirmModal';
import { SearchInput } from '../../ui/SearchInput';
import { Loader } from '../../ui/Loader';

import { EditIcon, TrashIcon } from '../../ui/svg.module';
import cls from './index.module.scss'

const UsersList = () => {
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const [queryText, setQueryText] = useState('');
    const [sortedField, setSortedField] = useState('');

    const [serverResponse, setServerResponse] = useState(-1);
    const [showServerErrorMessage, setShowServerErrorMessage] = useState(true);

    const [isOpenEditModal, setOpenEditModal] = useState(false);
    const [isOpenDeliteConfirmModal, setOpenDeliteConfirmModal] = useState(false);

    useEffect(() => {
        try {
            getCardsListService().then(response => {
                setServerResponse(response._code);
                if (response.state) {
                    setData(response.data.map(e => ({
                        _id: e.id,
                        date1: e.creationDate,
                        date2: new Date(e.lastDate).toLocaleString('RU'),
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
            }).catch(err => {
                setLoading(true);
                console.error(err);
            });
        } catch (err) {
            setLoading(true);
            console.error(err);
        }
    }, []);

    const filteredByDate = queryText.length ? data.filter(e => e.cardKey.includes(queryText)) : data;

    const handleEdit = (obj) => {
        setOpenEditModal(true);
        setItemData(obj);
    }

    const handleDelete = (obj) => {
        setOpenDeliteConfirmModal(true);
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
                                        <TableHeadCell onClick={() => setSortedField('date1')}>
                                            Дата создания
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('date2')}>
                                            Крайнее посещение
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('amount')}>
                                            Кол-во посещений
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('fio')}>
                                            Ф.И.О.
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('cardKey')}>
                                            Пропуск
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('status')}>
                                            Статус
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('phoneNumber')}>
                                            Номер телефона
                                        </TableHeadCell>
                                        <TableHeadCell onClick={() => setSortedField('carNumber')}>
                                            Номерной знак
                                        </TableHeadCell>
                                        <TableHeadCell>Редактировать</TableHeadCell>
                                        <TableHeadCell>Удалить</TableHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredByDate.length ? (
                                        filteredByDate.map((row, index) => (
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
                                                <TableBodyCell data-red onClick={() => handleDelete(row._id)}>
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

            {isOpenDeliteConfirmModal && (
                <DeliteConfirmModal
                    item={itemData}
                    setVisible={setOpenDeliteConfirmModal}
                />
            )}

        </section>
    );
};

export default UsersList;