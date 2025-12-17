import { api } from './api';
import { Registration, Address } from '@/types/registration';

class RegistrationService {
  // Cria um novo registro já com dados de identificação
  async create(payload: { name: string; email: string }): Promise<Registration> {

    console.log('aaaa', payload)
    const { data } = await api.post<Registration>('/registration', payload);
    return data;
  }

  // Atualiza a identificação se o registro já existir
  async updateIdentification(
    id: string,
    payload: { name: string; email: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/contact`,
      payload,
    );
    return data;
  }

  async updateDocument(id: string, payload: { document: string }): Promise<Registration> {
    const { data } = await api.patch<Registration>(`/registration/${id}/document`, payload);
    return data;
  }

  async updatePhone(id: string, payload: { phone: string }): Promise<Registration> {
    const { data } = await api.patch<Registration>(`/registration/${id}/contact`, payload);
    return data;
  }
  
  async getAddressByCep(cep: string): Promise<Partial<Address>> {
    const { data } = await api.get<Partial<Address>>(`/registration/cep/${cep}`);
    return data;
  }
  
  async updateAddress(id: string, payload: Address): Promise<Registration> {
    const { data } = await api.patch<Registration>(`/registration/${id}/address`, payload);
    return data;
  }

  async finish(id: string): Promise<{ message: string }> {
    const { data } = await api.patch<{ message: string }>(`/registration/${id}/finish`);
    return data;
  }

  async findById(id: string): Promise<Registration> {
    const { data } = await api.get<Registration>(`/registration/${id}`);
    return data;
  }
}

export const registrationService = new RegistrationService();
