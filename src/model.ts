export interface IUser {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    phone : string;
    address : {
        streetAddress : string ;
        city : string ;
        state : string;
        zip : string;
    },
    description : string;
}

export interface ITHead {
    sortById : (e : React.MouseEvent) => void;
    searchByColumn : (e : React.ChangeEvent) => void;
}

export interface IPagin {
    nPages : number;
    currentPage : number; 
    setCurrentPage : any;
}

export interface ITable {
    users : IUser[];
    loading : boolean;
}

export interface IFormValues {
    fname : string;
    lname : string;
    email : string;
    phone : string;
}