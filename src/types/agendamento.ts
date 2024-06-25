export type AgendamentoProps = {
  idBarbeiro: number;
  idServico: number;
  idCliente: number;
  dataInicio: string | null;
  dataFim: string | null;
};

export type AgendaBarbeiroProps = {
  atendimento_id: number;
  cliente_id: number;
  titulo: string;
  valor: string;
  nome_completo: string;
  celular: string;
  email: string;
  dt_inicio: string;
  dt_fim: string;
};
