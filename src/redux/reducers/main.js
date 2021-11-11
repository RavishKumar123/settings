import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    tabs: {},
    stateReady: false,
  },
  reducers: {
    addTabsState: (state, action) => {
      state.tabs = action.payload;
      state.stateReady = true;
    },
    changeMainValue: (state, action) => {
      state.tabs[action.payload.option.name] = action.payload.value;
    },
  },
});

export const { changeMainValue, addTabsState } = settingSlice.actions;

export default settingSlice.reducer;
