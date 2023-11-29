import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Beer } from '../../types';

interface ItemListState {
  items: Beer[];
  currentItem?: Beer | null;
}

const initialState: ItemListState = {
  items: [],
  currentItem: null,
};

export const itemListSlice = createSlice({
  name: 'item list',
  initialState,
  reducers: {
    updateItemList(state, action: PayloadAction<Beer[]>) {
      state.items = action.payload;
    },
    updateCurrentItem(state, action: PayloadAction<Beer>) {
      state.currentItem = action.payload;
    },
  },
});

export default itemListSlice.reducer;
