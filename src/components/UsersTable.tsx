import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectData, newData } from "./../redux/stor";
import "./styles/style.css";
//import { data } from "./../data/data";
import { IUser } from "./../model";
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import AddNewUser from "./../components/AddNewUser";

const UsersTable : React.FC = () => {
    let dispatch = useDispatch();
    //let users : IUser[] = useSelector(selectData);

    const [users, setUsers] = useState<IUser[]>([]);
    const [usersClone, setUsersClone] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByDesc, setSortByDesc] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userPerPage, setUserPerPage] = useState<number>(10);
    

    
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

    const indexOfLastUsers = currentPage * userPerPage;
    const indexOfFirstUsers = indexOfLastUsers - userPerPage;
    const nPages = Math.ceil(users.length / userPerPage);
    const currentUsers = useRef<any>();
    currentUsers.current = users.slice(indexOfFirstUsers, indexOfLastUsers)

    const [showForm, setShowForm] = useState<boolean>(true);

    let sortById = (e? : React.MouseEvent) : void => {
        const clickedEl = e?.target as HTMLTableCellElement;

        setUsersClone(currentUsers.current.sort((a : IUser , b : IUser) => sortByDesc ? a.id - b.id : b.id - a.id ))
        setSortByDesc(!sortByDesc);
        currentUsers.current = [...currentUsers.current.sort((a : IUser , b : IUser) => sortByDesc ? a.id - b.id : b.id - a.id )]
        clickedEl?.classList.toggle('id-icon-dir-down');

    }

    return (
        <div>
            <h1>Users Table</h1>
            {showForm 
                ? <input type='button' value='add' className='btn btn-success' onClick={e => setShowForm(p => !p)} /> 
                : <AddNewUser setShowForm={setShowForm} setUsers={setUsers} users={users} />
            }
            <table>
    
                    <TableHead sortById={sortById}  />
                    <TableBody users={ currentUsers.current } loading={loading} />
   
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
