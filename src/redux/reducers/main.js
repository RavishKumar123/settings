import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "settings",
  initialState: {
    tabs: {},
  },
  reducers: {
    addTabsState: (state, action) => {
      state.tabs = action.payload;
    },
    changeMainValue: (state, action) => {
      state.tabs[action.payload.tabName][action.payload.option.name] =
        action.payload.value;
    },
    changeNestedMainValue: (state, action) => {
      state.tabs[action.payload.tabName][action.payload.option.name][
        action.payload.propertyName
      ] = action.payload.value;
    },
  },
});

export const { changeMainValue, changeNestedMainValue, addTabsState } =
  counterSlice.actions;

export default counterSlice.reducer;
