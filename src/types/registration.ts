export type Address = {
    cep?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
  };
  
  export type Registration = {
    id: string;
    name?: string;
    email?: string;
    document?: string;
    phone?: string;
    address?: Address;
    createdAt: string;
    updatedAt: string;
    finishedAt?: string;
  };
  