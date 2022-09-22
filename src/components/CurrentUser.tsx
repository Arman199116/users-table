import React from "react";
import { IUser } from "./../model";
import { useSelector } from "react-redux";
import { selectShow, selectCurrentUser } from "./../redux/stor";

const CurrentUser : React.FC = () => {
    // show current user
    const show : boolean = useSelector(selectShow);
    const user : IUser = useSelector(selectCurrentUser);
    if (show) {
        return (
            <div className="current-user">
                <p>Selected user: <b>{user.firstName}</b></p> 
                <p>Address: <b>{user.address?.streetAddress}</b></p>
                <p>City: <b>{user.address?.city}</b></p>
                <p>Province/St: <b>{user.address?.state}</b></p>
                
                
            </div>
        );
    }
    return <></>
};

export default React.memo(CurrentUser);
