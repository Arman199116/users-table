import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserState, IUser } from './../model';
import { apiSlice } from './apiSlice';
//import { current } from '@reduxjs/toolkit'

export const fetchData : any = createAsyncThunk(
    'user/fetchData',
    async function(_, {rejectWithValue}) {
        try {
            let res : any = await fetch('http://www.filltext.com/?rows=20&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}')
            if(!res.ok) {
                throw new Error("Server Error");
            }
            let data = await res.json();
            return {data : data};
        } catch (error : any) {
            return rejectWithValue(error.message);
        }
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
        [fetchData.pending] : (state : IUserState) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchData.fulfilled] : (state : IUserState, action : PayloadAction<any>) => {
            return {
                ...state,
                status : 'resolved',
                data : action.payload.data,
                error : null,
            }
        },
        [fetchData.rejected] : (state : IUserState, action : PayloadAction<any>) => {
            state.error = action.payload;
            state.status = 'rejected';
        },
    }
})
//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

export const selectCurrentUser = (state : {user : IUserState}) => state.user.currentUser;
export const selectData = (state : {user : IUserState}) => state.user.data;
export const selectStatus = (state : {user : IUserState}) => state.user.status;
export const selectError = (state : {user : IUserState}) => state.user.error;
export const selectShow = (state : {user : IUserState}) => state.user.show;
export const { showCurrentUser } = userState.actions;
const store = configureStore({
    reducer : {
        user : userState.reducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;