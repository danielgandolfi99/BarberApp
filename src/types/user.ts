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
  name: string;
};
