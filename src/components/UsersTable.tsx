import React, { useEffect, useState } from 'react';
import "./styles/style.css";
import { IUser } from "./../model";
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import axios from 'axios';
import AddNewUser from "./../components/AddNewUser";
import { a } from "./data";
import { fetchData } from "./../redux/stor";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";

const UsersTable : React.FC = () => {

    let dispatch = useAppDispatch();

    const [users, setUsers] = useState<IUser[]>(a);
    const [loading, setLoading] = useState<boolean>(false);
    const [sort, setSort] = useState<boolean>(false);
    const [search, setSearch] = useState<{searchedInput : string, getByColumn : string }>({searchedInput : '', getByColumn : '' });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userPerPage] = useState<number>(15);
    const [showForm, setShowForm] = useState<boolean>(true);

    // useEffect(() => {
    //     let fetchUsers = async() => {
    //         try {
    //             setLoading(true);
    //             let res = await axios.get('http://www.filltext.com/?rows=172&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}');
    //             setUsers(res.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchUsers();
    // }, []);
    // pagination

    useEffect(() => {
        console.log(111);
        
        dispatch(fetchData());
        console.log(2222);
    }, [dispatch]);

    const indexOfLastUsers = currentPage * userPerPage;
    const indexOfFirstUsers = indexOfLastUsers - userPerPage;

    const nPages = Math.ceil(users.length / userPerPage);

    let currentUsers : any = {};
    currentUsers['currentPages'] = users.slice(indexOfFirstUsers, indexOfLastUsers).sort((a : IUser , b : IUser) => sort ? a.id - b.id : b.id - a.id )

    if (search.searchedInput.length > 1) {
        currentUsers['currentPages'] = users.filter((user : any) => {
            return user[search.getByColumn as keyof typeof user].toString().toLowerCase().indexOf(search.searchedInput) >= 0
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

    return (
        <div>
            <h1>Users Table</h1>
            {showForm 
                ? <input type='button' value='add' className='btn btn-success' onClick={e => setShowForm(p => !p)} /> 
                : <AddNewUser setShowForm={setShowForm} setUsers={setUsers} users={users} />
            }
            <table>
                <TableHead sortById={sortById} searchByColumn={searchByColumn}  />
                <TableBody users={ currentUsers.currentPages } loading={loading} />
            </table>

            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default UsersTable;
