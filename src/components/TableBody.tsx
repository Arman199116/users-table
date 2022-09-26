import React from 'react';
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { showCurrentUser, selectCurrentUser, selectStatus, selectError } from './../redux/stor';
import { ITable, IUser } from "./../model";


const TableBody : React.FC<ITable> = ({users, isLoading, error}) => {
    let prevUser : IUser = useAppSelector(selectCurrentUser);
    // let loadingShow = useAppSelector(selectStatus);
    // let loadingError = useAppSelector(selectError);

    let dispatch = useAppDispatch();

    if (/*isLoading === 'loading'*/ isLoading) {
        return  <tbody><tr><td>Loading...</td></tr></tbody>
    }

    if (/*loadingShow === 'rejected' && loadingError*/ error) {
        return  <tbody><tr><td>{error.error.toString()}</td></tr></tbody>
    }

    let currentUserFn = (user : IUser) => {
        if (prevUser?.id !== user.id) {
            dispatch(showCurrentUser({type : 'SHOW', user : user, show : true}))
        }
    }

    return (
        <tbody>
            {
                users.map((user : IUser) => (
                    <tr key={user.id} className='users-table-row' onClick={e => currentUserFn( user )} >
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

export default React.memo(TableBody);

