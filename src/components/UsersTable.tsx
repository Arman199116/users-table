import React, { useCallback, useEffect, useMemo, useState } from 'react';
import "./styles/style.css";
import { data } from "./../data/data";
import { IUser } from "./../model";
import TableBodys from './TableBody';
import TableHeader from './TableHead';
import Pagination from './Pagination';
import CurrentUser from './CurrentUser';

const UsersTable : React.FC = () => {

    // pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage] = useState<number>(7);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(data.length / recordsPerPage);
    const currentRecords : IUser[] = data.slice(indexOfFirstRecord, indexOfLastRecord);

    let TableHead = useMemo(() => TableHeader, []);
    let TableBody = useMemo(() => TableBodys, []);

    const [sortedData, setSortedData] = useState<IUser[]>(currentRecords);
    useEffect(() => {
        setSortedData(currentRecords);
        sortById();
    }, [currentPage])

    const [sortByDesc, setSortByDesc] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let sortById = useCallback((e? : React.MouseEvent) : void => {
        const clickedEl = e?.target as HTMLTableCellElement;
        setSortedData([...currentRecords.sort((a : IUser , b : IUser) => sortByDesc ? a.id - b.id : b.id - a.id )]);
        setSortByDesc(!sortByDesc);
        clickedEl?.classList.toggle('id-icon-dir-down');

    },[sortByDesc]);

    let searchByColumn = useCallback((e : React.ChangeEvent) : void => {
        setIsLoading(true);
        const changedEl = e.target as HTMLInputElement;

        let searchedInput : string = changedEl.value?.trim().toLowerCase();
        let getByColumn : string = changedEl.dataset['userinfo'] || '';

        if (searchedInput) {
            if (searchedInput.length <= 1) {
                setSortedData(currentRecords)
            } else {
                setSortedData([...currentRecords.filter((user : IUser) => {
                    return user[getByColumn as keyof typeof user].toString().toLowerCase().indexOf(searchedInput) >= 0
                })]);
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <div>
            <h1>Users Table</h1>
            <table>
                {
                    <TableHead searchByColumn={searchByColumn} sortById={sortById} />
                }
                {
                    <TableBody sortedData={sortedData} isLoading={isLoading} />
                }
            </table>
            <CurrentUser />
            <Pagination
                nPages = { nPages }
                currentPage = { currentPage } 
                setCurrentPage = { setCurrentPage }
            />
        </div>
    )
}

export default UsersTable
