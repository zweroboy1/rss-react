import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Beer } from '../../types';

interface ItemListState {
  items: Beer[];
}

const initialState: ItemListState = {
  items: [],
};

const itemListSlice = createSlice({
  name: 'item list',
  initialState,
  reducers: {
    updateItemList(state, action: PayloadAction<Beer[]>) {
      state.items = action.payload;
    },
  },
});

export const { updateItemList } = itemListSlice.actions;
export const itemListReducer = itemListSlice.reducer;
