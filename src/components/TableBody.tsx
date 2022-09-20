import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {showCurrentUser, selectCurrentUser} from './../redux/stor'
import { ITable, IUser } from "./../model";


const TableBody : React.FC<ITable> = ({sortedData , isLoading} ) => {
    let dispatch = useDispatch();
    const prevUser : IUser = useSelector(selectCurrentUser);
    if (isLoading) {
        return <div>Loading...</div>
    }

    let handleShow = (user : IUser) => {
        if (prevUser.id !== user.id) {
            dispatch(showCurrentUser({type : 'SHOW', user : user, show : true}));
        }
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
