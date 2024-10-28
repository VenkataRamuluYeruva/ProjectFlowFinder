import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
   user:[]
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export const { setUser } = userSlice.actions;
export default store;
