import { IFormValues } from "../../model";

export function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const validate = (values : IFormValues) : IFormValues => {
    const errors : IFormValues = {fname : '', lname : '', email : '', phone : '' };
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fname.length) {
        errors.fname = "FirstName is Required";
    }

    if (!values.lname.length) {
        errors.lname = "LastName is Required";
    }

    if (!values.email.length) {
        errors.email = "Email is Required";
    } else if (!regex.test(values.email)) {
        errors.email = "Not valid email";
    }

    let phRegex = /^\(([0-9]{3})\)([ ]*?)([0-9]{3})[-]([0-9]{4})$/

    if (!values.phone.length) {
        errors.phone = "Phone is Required";
     } // else if (!phRegex.test(values.phone)) {
    //     errors.phone = "Not valid phone (Format : (XXX) XXX-XXXX";
    // }

    return errors;
}

export default validate;