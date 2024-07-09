export type LoginProps = {
  username: string;
  password: string;
};

export type RegisterUserProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
};

export type userRegistrationData = {
  cliente_id: number;
  barbeiro_id: number | null;
  user_id: number;
  username: string;
  name: string;
  ativo: number;
  verificador: string;
};
