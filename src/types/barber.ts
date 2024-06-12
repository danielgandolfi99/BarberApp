export type RegisterBarberProps = {
  nome: string;
  email: string;
  celular: string;
  senha: string;
  imagem: {
    type: string;
    data: number[];
  };
  barbeiro_id?: number;
};
