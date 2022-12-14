import React, {useState, useEffect} from 'react'
import { IFormValues,IUser } from '../model';
import validate, { getRandomInt } from './functions/validate';
//import { data } from "./../data/data";
import { useSelector, useDispatch} from "react-redux";
import { selectData, newData } from "./../redux/stor";

const AddNewUser : React.FC<any> = ({setShowForm}) => {

    let data = useSelector(selectData);
    let dispatch = useDispatch();

    const [formErrors, setFormErrors] = useState<IFormValues>({fname : '', lname : '', email : '', phone : ''});
    const [formData, setFormData] = useState<IFormValues>({fname : '', lname : '', email : '', phone : ''});
    const [add, setAdd] = useState<boolean>(false);

    let handleAdd = (e : React.FormEvent) => {
        e.preventDefault();

        const formEl = e.target as HTMLFormElement;
        let {fname, lname, email, phone} = formEl;

        let firstName = fname.value;
        let lastName = lname.value;
        let emailValue = email.value;
        let phoneValue = phone.value;

        setFormErrors(validate({fname : firstName, lname : lastName, email : emailValue, phone : phoneValue}));
        setFormData({fname : firstName, lname : lastName, email : emailValue, phone : phoneValue});

        if (data.find((user : IUser) => user.email === emailValue )?.email) {
            setFormErrors((prevObj : IFormValues) => {
               return {...prevObj, email : 'Email is used' };
            });
        }

        //setShowForm((p : boolean) => !p);
    }

    
    let {fname, lname, email, phone} = formErrors;
    
    
    if (fname || lname || email || phone) {
        console.log(fname, lname, email, phone);
    } else if (formData.fname || formData.lname || formData.email || formData.phone) {

        let id = getRandomInt(0, 1e6);
        while (data.find((user : IUser) => user.id === id )?.id) {
            id = getRandomInt(0, 1e9);
        }
        dispatch(newData({
            type : 'UPDATE',
            user : { id : id, firstName : formData.fname, lastName : formData.lname, email : formData.email, phone : formData.phone}
        })) ;
        console.log('success');
    }


    return (
        <form onSubmit={e => handleAdd(e)} className='form-add'>
            <input type="text" name="fname"/>
            <small className="errorMessage" style={{display : formErrors.fname ? 'block' : 'none'}}>{formErrors.fname}</small>
            <input type="text" name="lname"/>
            <small className="errorMessage" style={{display : formErrors.lname ? 'block' : 'none'}}>{formErrors.lname}</small>
            <input type="text" name="email"/>
            <small className="errorMessage" style={{display : formErrors.email ? 'block' : 'none'}}>{formErrors.email}</small>
            <input type="text" name="phone"/>
            <small className="errorMessage" style={{display : formErrors.phone ? 'block' : 'none'}}>{formErrors.phone}</small>
            <input type="submit" className="btn btn-primary" value='Submit' />
        </form>
            
    )
}

export default React.memo(AddNewUser);
