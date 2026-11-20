import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
  ],
};

export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, title, description } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], title, description };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { createItem, updateItem, deleteItem } = crudSlice.actions;

export default crudSlice.reducer;
