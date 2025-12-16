import { api } from './api';
import { Registration, Address } from '@/types/registration';



class RegistrationService {

// optei por usar classe por agrupar semanticamente e ser mais legivel
  async create(): Promise<Registration> {
    const { data } = await api.post<Registration>('/registration');
    return data;
  }

  async updateIdentification(
    id: string,
    payload: { name: string; email: string },
  ): Promise<Registration> {
    // rota para criar um novo rascunho ou novo registro (id)
    const { data } = await api.patch<Registration>(
      `/registration/${id}/contact`,
      payload,
    );
    return data;
  }

  async updateDocument(
    id: string,
    payload: { document: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/document`,
      payload,
    );
    return data;
  }

  async updatePhone(
    id: string,
    payload: { phone: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/contact`,
      payload,
    );
    return data;
  }

  async updateAddress(
    id: string,
    payload: Address,
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/address`,
      payload,
    );
    return data;
  }

  async finish(id: string): Promise<{ message: string }> {
    const { data } = await api.patch<{ message: string }>(
      `/registration/${id}/finish`,
    );
    return data;
  }

  async findById(id: string): Promise<Registration> {
    const { data } = await api.get<Registration>(`/registration/${id}`);
    return data;
  }
  
}

export const registrationService = new RegistrationService();