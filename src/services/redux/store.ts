import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import agendamentoReducer from "./agendamento";
import userReducer from "./agendamento";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agendamento: agendamentoReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
