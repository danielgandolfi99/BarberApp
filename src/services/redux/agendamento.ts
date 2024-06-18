import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgendamentoProps } from "../../types/agendamento";

const initialState: AgendamentoProps = {
  idBarbeiro: 0,
  idServico: 0,
  idCliente: 0,
  dataInicio: null,
  dataFim: null,
};

const agendamento = createSlice({
  name: "agendamento",
  initialState,
  reducers: {
    setAgendamento(state, action: PayloadAction<AgendamentoProps>) {
      const agendamento = action.payload;
      state.idBarbeiro = +agendamento.idBarbeiro;
      state.idServico = +agendamento.idServico;
      state.idCliente = +agendamento.idCliente;
      state.dataInicio = agendamento.dataInicio;
      state.dataFim = agendamento.dataFim;
    },
    resetAgendamento(state) {
      state.idBarbeiro = 0;
      state.idServico = 0;
      state.idCliente = 0;
      state.dataInicio = null;
      state.dataFim = null;
    },
    setIdServico(state, action: PayloadAction<number>) {
      state.idServico = action.payload;
    },
  },
});

export const { setAgendamento, resetAgendamento, setIdServico } =
  agendamento.actions;

export default agendamento.reducer;
