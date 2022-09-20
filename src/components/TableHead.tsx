import React from 'react'
import { ITHead } from '../model'

const TableHead : React.FC<ITHead> = ({sortById, searchByColumn}) => {
    return (
        <thead>
            <tr >
                <th className="table-headers">
                    <p onClick={e => sortById(e) } className="id-icon-dir-top" >Id</p>
                    <input onChange={e => searchByColumn(e)} data-userinfo='id' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>FirstName</p>
                    <input onChange={e => searchByColumn(e)} data-userinfo='firstName' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>LastName</p>
                    <input onChange={e => searchByColumn(e)} data-userinfo='lastName' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>Email</p>
                    <input onChange={e => searchByColumn(e)} data-userinfo='email' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>Phone</p>
                    <input onChange={e => searchByColumn(e)} data-userinfo='phone' type="text" placeholder="Search by .." />
                </th>
            </tr>
        </thead>
    )
}

export default React.memo(TableHead);
