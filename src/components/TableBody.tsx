import React from 'react';
import { useDispatch, useSelector, connect } from "react-redux";
import {showCurrentUser, selectCurrentUser, selectCurrentPage} from './../redux/stor';
import { ITable, IUser } from "./../model";
import { createSelector } from 'reselect';


const TableBody : React.FC<ITable> = ( {users, loading} ) => {

    if (loading) {
        return  <tbody><tr><td>Loading...</td></tr></tbody>
    }
     
    return (
        <tbody>
            {
                users.map((user : IUser) => (
                    <tr key={user.id} className='users-table-row' >
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


let getChartValue = createSelector([ selectCurrentPage ], ( currentPage ) => {
    return {
        currentPage
    };
});
const mapStateToProps = (state : any) => {
    const { currentPage } = getChartValue(state);
    return {
        users : currentPage
    }
}

export default TableBody

