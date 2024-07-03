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

export type AgendaClienteProps = {
  atendimento_id: number;
  barbeiro_id: number;
  servico_id: number;
  cliente_id: number;
  dt_inicio: string;
  dt_fim: string;
  finalizado: number;
  valor: string;
  nome_barbeiro: string;
  servico: string;
  descricao_servico: string;
  avaliacao?: number;
};

export type AvaliacaoClienteProps = {
  idAtendimento: number;
  value: number;
};
