import React from 'react';
import { useDispatch } from "react-redux";
import {showCurrentUser} from './../redux/stor'
import { IUser } from "./../model";
import { ITable } from "./../model";


const TableBody : React.FC<ITable> = ({sortedData , isLoading} ) => {
    let dispatch = useDispatch();
    if (isLoading) {
        return <div>Loading...</div>
    }
    let handleShow = (user : IUser) => {
        dispatch(showCurrentUser({type : 'SHOW', user : user, show : true}));
    }
    return (
        <tbody>
            {
                sortedData.map((user : IUser) => (
                    <tr key={user.id} className='users-table-row' onClick={e => handleShow(user)} >
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                )) 
            }
        </tbody>
    )
}

export default TableBody
