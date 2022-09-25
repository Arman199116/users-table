import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUserState, IUser } from './../model'

//import { current } from '@reduxjs/toolkit'

export const fetchData : any = createAsyncThunk(
    'user/fetchData',
    async function fetch() {
        const res = await axios.get('http://www.filltext.com/?rows=172&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}')
        return {data : res.data};
    }
);

const initialState : IUserState = {
        data : [],
        currentUser : {
            id : 0,
            firstName : '',
            lastName : '',
            email : '',
            phone : '',
            address : {
                streetAddress : '',
                city : '',
                state : '',
                zip : '',
            },
            description : '',
        },
        show : false,
        status : null,
        error : null,
}

const userState = createSlice({
    name : "user",
    initialState : initialState,

    reducers : {
        showCurrentUser : (state : IUserState, action : PayloadAction<{type: string; user: IUser; show: boolean;} >) => {
            switch (action.payload.type) {
                case 'SHOW':
                    return {
                        ...state,
                        show : action.payload.show,
                        currentUser : {...action.payload.user}
                    }
                default:
                    break;
            }
        },
    },
    extraReducers : {
        [fetchData.pending] : (state : any, action : any) => {
            state.user.status = 'loading';
            state.user.error = null;
        },
        [fetchData.fulfilled] : (state : any, action : any) => {
            state.user.status = 'resolved';
            state.user.data = action.payload.data;
        },
        [fetchData.rejected] : (state : any, action : any) => {},
    }
})
//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

export const selectCurrentUser = (state : {user : IUserState}) => state.user.currentUser;
export const selectShow = (state : {user : IUserState}) => state.user.show;
export const { showCurrentUser } = userState.actions;
const store = configureStore({
    reducer : {
        user : userState.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;