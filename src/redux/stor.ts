import { configureStore, createSlice } from '@reduxjs/toolkit';
import {IUser} from './../model'

//import { current } from '@reduxjs/toolkit'

const userState = createSlice({
    name : "user",

    initialState : {
        currentUser : {},
        show : false,
        showForm : true,
        data : []
    },

    reducers : {
        showCurrentUser : (state, action) => {
            switch (action.payload.type) {
                case 'SHOW':
                    return {
                        ...state,
                        show : action.payload.show,
                        currentUser : {...action.payload.user}
                    }
                case 'SHOW_FORM':
                    return {
                        ...state,
                        showForm : action.payload.show
                    }
                default:
                    break;
            }
        },
        newData : (state : any, action : any) => {
            switch (action.payload.type) {
                case 'ADD':
                    return {
                        ...state,
                        data : action.payload.data,
                    }
                case 'UPDATE':
                    return {
                        ...state,
                       data : state.data.unshift( action.payload.user )
                    }
               
                default:
                    break;
            }
        },
    }
})
//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

export const selectCurrentUser = (state : any) => state.currentUser;
export const selectShow = (state : any) => state.show;
export const selectShowForm = (state : any) => state.showForm;
export const selectData = (state : any) => state.data;
export const { showCurrentUser, newData } = userState.actions;
const store = configureStore({
    reducer : userState.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
export type RootState = ReturnType<typeof store.getState>
export default store;