import React, {useState} from 'react'
import { IFormValues, IUser } from '../model';
import validate, { getRandomInt } from './functions/validate';

const AddNewUser : React.FC<any> = ({setShowForm, setUsers, users }) => {

    const [formErrors, setFormErrors] = useState<IFormValues>({fname : '', lname : '', email : '', phone : ''});
    const [formData, setFormData] = useState<IFormValues>({fname : '', lname : '', email : '', phone : ''});


    let handleInputValues = (e : React.ChangeEvent) => {
        e.preventDefault();
        const changedEl = e.target as HTMLInputElement;

        let inputValue = changedEl.value;
        let attrName : string = changedEl.getAttribute('name') || '';
        let cloneFormData : any = { ...formData };
        cloneFormData[attrName] = inputValue;

        setFormData(cloneFormData);
    }

    let handleAdd = (e : React.FormEvent) => {
        e.preventDefault();

        let errors : IFormValues = validate({...formData});

        if (users.find((user : IUser) => user.email === formData.email)?.email) {
            errors['email'] = 'Email is used';
        }
        setFormErrors(errors);

        if (!errors.fname && !errors.lname && !errors.email && !errors.phone) {
            let id = getRandomInt(0, 1e6);
            while (users.find((user : IUser) => user.id === id )?.id) {
                id = getRandomInt(0, 1e6);
            }
            let formValues : IUser = {
                id : id,
                firstName : formData.fname,
                lastName : formData.lname,
                email : formData.email,
                phone : formData.phone,
                address : {
                    streetAddress : 'streetAddress 1',
                    city : 'Erevan',
                    state : 'state',
                    zip : 'zip'
                },
                description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, dolorum!'
            }
            setUsers([formValues, ...users]);

            setShowForm((p : boolean) => !p);
        }
    }

    return (
        <form onSubmit={e => { handleAdd(e) }} className='form-add'>
            <input onChange={e => handleInputValues(e)} type="text" name="fname" placeholder='firstname' />
            <small className="errorMessage" style={{display : formErrors.fname ? 'block' : 'none'}}>{formErrors.fname}</small>
            <input onChange={e => handleInputValues(e)} type="text" name="lname" placeholder='lastname' />
            <small className="errorMessage" style={{display : formErrors.lname ? 'block' : 'none'}}>{formErrors.lname}</small>
            <input onChange={e => handleInputValues(e)} type="text" name="email" placeholder='email' />
            <small className="errorMessage" style={{display : formErrors.email ? 'block' : 'none'}}>{formErrors.email}</small>
            <input onChange={e => handleInputValues(e)} type="text" name="phone" placeholder='phone' />
            <small className="errorMessage" style={{display : formErrors.phone ? 'block' : 'none'}}>{formErrors.phone}</small>
            <input type="submit" className="btn btn-primary" value='Submit' />
            <input onClick={e => setShowForm((p : boolean) => !p)} type="button" className="btn btn-danger" value='Cancle' />
        </form>

    )
}

export default React.memo(AddNewUser);
