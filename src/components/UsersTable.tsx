import React, { useEffect, useRef, useState, useCallback } from 'react';
import "./styles/style.css";
import { data } from "./../data/data";
import { IUser } from "./../model";

const UsersTable : React.FC = () => {

    const [sortedData, setSortedData] = useState<IUser[]>(data);
    const [sortByDesc, setSortByDesc] = useState<boolean>(true);

    let sortById = (e? : React.MouseEvent) : void => {
        const clickedEl = e?.target as HTMLTableHeaderCellElement;
        setSortedData(sortedData.sort((a : IUser , b : IUser) => sortByDesc ? a.id - b.id : b.id - a.id ));
        setSortByDesc(prev => !prev);
        clickedEl?.classList.toggle('id-icon-dir-down');
    }

    let searchByColumn = (e ?: React.ChangeEvent) : void => {
        const changedEl = e?.target as HTMLInputElement;

        let searchedInput : string = changedEl.value?.trim().toLowerCase();
        let getByColumn : string | undefined = changedEl.dataset['userinfo'];
       
        if (searchedInput) {
            //`${item}.${getByColumn}`.indexOf(searchedInput) >= 0
            setSortedData([...sortedData.filter((user : IUser) => {
                console.log(typeof `${user}.${getByColumn}`);
                
                return `${user}.${getByColumn}`.indexOf(searchedInput.toString()) >= 0
            })]);
        }  
    }

    useEffect(() => {
        sortById();
    }, [])

    return (
        <div className="container">
            <h1>Users Table</h1>
            <table className="users-table table-info">
                <thead>
                    <tr >
                        <th className="table-headers">
                            <p onClick={e => sortById(e) } className="id-icon-dir-top" >Id</p>
                            <input onChange={e => searchByColumn(e)} data-userinfo='id' type="text" placeholder="Serarch by" />
                        </th>
                        <th className="table-headers">
                            <p>FirstName</p>
                            <input data-userinfo='firstName' type="text" placeholder="Serarch by" />
                        </th>
                        <th className="table-headers">
                            <p>LastName</p>
                            <input data-userinfo='lastName' type="text" placeholder="Serarch by" />
                        </th>
                        <th className="table-headers">
                            <p>Email</p>
                            <input data-userinfo='email' type="text" placeholder="Serarch by" />
                        </th>
                        <th className="table-headers">
                            <p>Phone</p>
                            <input data-userinfo='phone' type="text" placeholder="Serarch by" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        sortedData.map((item : IUser) => (
                            <tr key={item.id} className='users-table-row'>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>            
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable
