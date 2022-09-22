import React from 'react'
import { ITHead } from '../model'

const TableHead : React.FC<ITHead> = ({sortById}) => {
    return (
        <thead>
            <tr >
                <th className="table-headers">
                    <p onClick={e => sortById(e)} className="id-icon-dir-top" >Id</p>
                    <input  data-userinfo='id' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>FirstName</p>
                    <input data-userinfo='firstName' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>LastName</p>
                    <input data-userinfo='lastName' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>Email</p>
                    <input data-userinfo='email' type="text" placeholder="Search by .." />
                </th>
                <th className="table-headers">
                    <p>Phone</p>
                    <input data-userinfo='phone' type="text" placeholder="Search by .." />
                </th>
            </tr>
        </thead>
    )
}

export default React.memo(TableHead);
