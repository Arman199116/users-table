import React, { useEffect, useState, useMemo } from 'react';
import "./styles/style.css";
import { IUser } from "./../model";
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import AddNewUser from "./../components/AddNewUser";
import { fetchData, selectData } from "./../redux/stor";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
//import { useGetUsersQuery } from '../redux/apiSlice';

const UsersTable : React.FC= () => {

    //const { data = [], isLoading, error }  = useGetUsersQuery();

    let dispatch = useAppDispatch();
    let data = useAppSelector(selectData);

    const [users, setUsers] = useState<IUser[]>([]);
    const [sort, setSort] = useState<boolean>(false);
    const [search, setSearch] = useState<{searchedInput : string, getByColumn : string}>({searchedInput : '', getByColumn : '' });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userPerPage] = useState<number>(18);
    const [showForm, setShowForm] = useState<boolean>(true);

    useEffect(() => {
        dispatch(fetchData());
    }, []);
    useEffect(() => {
       setUsers(data);
    }, [data]);

    const indexOfLastUsers = currentPage * userPerPage;
    const indexOfFirstUsers = indexOfLastUsers - userPerPage;

    const nPages = Math.ceil(data.length / userPerPage);

    let currentUsers : any = {};
    currentUsers['currentPages'] = users.slice(indexOfFirstUsers, indexOfLastUsers).sort((a : IUser, b : IUser) => sort ? a.id - b.id : b.id - a.id);
 
    if (search.searchedInput.length > 1) {
        currentUsers['currentPages'] = currentUsers['currentPages'].filter((user : IUser) => {
            return user[search.getByColumn as keyof IUser].toString().toLowerCase().indexOf(search.searchedInput) >= 0
        });
    }

    let sortById = (e : React.MouseEvent) : void => {
        const clickedEl = e.target as HTMLTableCellElement;
        clickedEl.classList.toggle('id-icon-dir-down');
        setSort((p : boolean) => !p);
    }

    let searchByColumn = (e : React.ChangeEvent) : void => {
        const changedEl = e.target as HTMLInputElement;
        let searchedInput : string = changedEl.value?.trim().toLowerCase();
        let getByColumn : string = changedEl.dataset['userinfo'] || '';

        setSearch({searchedInput, getByColumn});
    };

    let head = useMemo(() => <TableHead sortById={sortById} searchByColumn={searchByColumn}  />, []);
    let body = useMemo(() => <TableBody users={ currentUsers.currentPages }  /> , [currentUsers.currentPages]);

    return (
        <div>
            <h1>Users Table</h1>
            {showForm 
                ? <input type='button' value='add' className='btn btn-success' onClick={e => setShowForm(p => !p)} /> 
                : <AddNewUser setShowForm={setShowForm} setUsers={setUsers} users={users} />
            }
            <table>
                {head}
                {body}
            </table>

            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default React.memo(UsersTable);
