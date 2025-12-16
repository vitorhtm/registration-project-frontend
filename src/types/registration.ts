export type Address = {
    cep: string;
    number?: string;
    complement?: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
};

export type Registration = {
  id: string;

  name?: string;
  email?: string;
  document?: string;
  phone?: string;

  // endereço (plano)
  cep?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  city?: string;
  state?: string;

  startedAt: string;
  finishedAt?: string | null;
  updatedAt: string;
};

  