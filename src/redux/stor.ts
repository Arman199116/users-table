import { configureStore, createSlice } from '@reduxjs/toolkit';
import {IUser} from './../model'

//import { current } from '@reduxjs/toolkit'

const userState = createSlice({
    name : "user",

    initialState : {
        currentUser : {},
        show : false,
        showForm : true,
        data : [],
        currentPage : []
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
                       data : action.payload.data
                    }
                case 'CURRENT_PAGE':
                    return {
                        ...state,
                        currentPage : action.payload.currentPage
                    }
               
                default:
                    break;
            }
        },
    }
})
//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

export const selectCurrentUser = (state : any) => state.currentUser;
export const selectCurrentPage = (state : any) => state.currentPage;
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