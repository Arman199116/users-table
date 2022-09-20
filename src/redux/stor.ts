import { configureStore, createSlice } from '@reduxjs/toolkit';

//import { current } from '@reduxjs/toolkit'

const userState = createSlice({
    name : "user",

    initialState : {
        currentUser : {},
        show : false
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
                default:
                    break;
            }
        },
    }
})


export const selectCurrentUser = (state : any) => state.currentUser;
export const selectShow = (state : any) => state.show;
export const { showCurrentUser } = userState.actions;
const store = configureStore({
    reducer : userState.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;