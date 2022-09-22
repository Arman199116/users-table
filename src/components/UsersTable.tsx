import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectData, newData } from "./../redux/stor";
import "./styles/style.css";
//import { data } from "./../data/data";
import { IUser } from "./../model";
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import axios from 'axios';
import AddNewUser from "./../components/AddNewUser";

const UsersTable : React.FC = () => {
    let dispatch = useDispatch();
    //let users : IUser[] = useSelector(selectData);

    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sort, setSort] = useState<boolean>(false);
    const [search, setSearch] = useState<{searchedInput : string, getByColumn : string }>({searchedInput : '', getByColumn : '' });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userPerPage, _] = useState<number>(10);
    const [showForm, setShowForm] = useState<boolean>(true);
    

    useEffect(() => {
        let fetchUsers = async() => {
            
            try {
                setLoading(true);
                let res = await axios.get('http://www.filltext.com/?rows=72&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}');    
               // dispatch(newData({type : 'ADD', data : res.data}))
                
                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);
    // pagination 
    const indexOfLastUsers = currentPage * userPerPage;
    const indexOfFirstUsers = indexOfLastUsers - userPerPage;
    const nPages = Math.ceil(users.length / userPerPage);
    
    let currentUsers : any = {};
    currentUsers['currentPage'] = users.slice(indexOfFirstUsers, indexOfLastUsers).sort((a : IUser , b : IUser) => sort ? a.id - b.id : b.id - a.id )
    
    if (search.searchedInput.length > 1) {  
        currentUsers['currentPage'] = users.filter((user : any) => {
            return user[search.getByColumn as keyof typeof user].toString().toLowerCase().indexOf(search.searchedInput) >= 0
        });
    }

    let sortById = (e : React.MouseEvent) : void => {
        const clickedEl = e.target as HTMLTableCellElement;
        clickedEl.classList.toggle('id-icon-dir-down');
        setSort((p : any) => !p);
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
                <TableBody users={ currentUsers.currentPage } loading={loading} />
   
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
