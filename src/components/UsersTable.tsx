import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectData, newData } from "./../redux/stor";
import "./styles/style.css";
//import { data } from "./../data/data";
import { IUser } from "./../model";
import TableBody from './TableBody';
import TableHeader from './TableHead';
import Pagination from './Pagination';
import CurrentUser from './CurrentUser';
import AddNewUser from './AddNewUser';
import axios from 'axios';

const UsersTable : React.FC = () => {
    let dispatch = useDispatch();
    //const [data, setData] = useState<IUser[]>([]);
    const data = useSelector(selectData);
   
    
    // pagination states
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [recordsPerPage] = useState<number>(15);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(data.length / recordsPerPage);
    const currentRecords : IUser[] = data.slice(indexOfFirstRecord, indexOfLastRecord);
    
    const [sortedData, setSortedData] = useState<IUser[]>(currentRecords);
    
    console.log(sortedData);

    let TableHead = useMemo(() => TableHeader, []);
    //let TableBody = useMemo(() => TableBodys, [data]);

    useEffect(() => {
        setSortedData([...currentRecords]);
        sortById();
    }, [currentPage])

    const [sortByDesc, setSortByDesc] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(true);
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
                setSortedData([...currentRecords.filter((user : any) => {
                    return user[getByColumn as keyof typeof user].toString().toLowerCase().indexOf(searchedInput) >= 0
                })]);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        (async() => {
            setIsLoading(true);
            try {
                let res = await axios.get('http://www.filltext.com/?rows=72&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}');    
                dispatch(newData({type : 'ADD', data : res.data}));
                
            } catch (error) {
                console.error(error);
            }
            //setData(res.data);
            setIsLoading(false);
        })()
    }, []);

    return (
        <div>
            <h1>Users Table</h1>
            {showForm 
                ? <input type='button' value='add' className='btn btn-success' onClick={e => setShowForm(p => !p)} /> 
                : <AddNewUser setShowForm={setShowForm} />
            }
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

export default UsersTable;
