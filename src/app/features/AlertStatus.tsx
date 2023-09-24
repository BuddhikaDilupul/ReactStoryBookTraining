import { createSlice } from "@reduxjs/toolkit";

interface AlertStatusState {
  text: string | null;
  variant: string | null;
}

const initialState: AlertStatusState = {
  text: null,
  variant: null,
};

const alertStatusSlice = createSlice({
  name: "alertStatus",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.text = action.payload.text;
      state.variant = action.payload.variant;
    },
    clearAlert: (state) => {
      state.text = null;
      state.variant = null;
    },
  },
});

export const { setAlert, clearAlert } = alertStatusSlice.actions;

export default alertStatusSlice.reducer;
