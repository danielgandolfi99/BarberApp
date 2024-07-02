import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userRegistrationData } from "../../types/user";

const initialState: userRegistrationData = {
  cliente_id: 0,
  name: "",
  barbeiro_id: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userRegistrationData>) {
      const user = action.payload;
      state.cliente_id = +user.cliente_id;
      state.name = user.name;
      state.barbeiro_id = user.barbeiro_id && +user.barbeiro_id;
    },
    resetUser(state) {
      state.cliente_id = 0;
      state.name = '';
      state.barbeiro_id = null;
    },
  },
});

export const { setUser, resetUser } = user.actions;

export default user.reducer;
