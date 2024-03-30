import { createSlice } from '@reduxjs/toolkit';

// Initial state with a generic 'homePage' key
const initialState = {
    positions: {
        homePage: 0,
    },
};

const scrollPositionSlice = createSlice({
    name: 'scrollPosition',
    initialState,
    reducers: {
        savePosition: (state, action) => {
            const { key, position } = action.payload;
            state.positions[key] = position;
        },
    },
});

export const { savePosition } = scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;
