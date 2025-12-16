import { api } from './api';
import { Registration, Address } from '@/src/types/registration';

export class RegistrationService {
  static async create(): Promise<Registration> {
    const { data } = await api.post<Registration>('/registration');
    return data;
  }

  static async updateIdentification(
    id: string,
    payload: { name: string; email: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/contact`,
      payload,
    );
    return data;
  }

  static async updateDocument(
    id: string,
    payload: { document: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/document`,
      payload,
    );
    return data;
  }

  static async updatePhone(
    id: string,
    payload: { phone: string },
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/contact`,
      payload,
    );
    return data;
  }

  static async updateAddress(
    id: string,
    payload: Address,
  ): Promise<Registration> {
    const { data } = await api.patch<Registration>(
      `/registration/${id}/address`,
      payload,
    );
    return data;
  }

  static async finish(id: string): Promise<{ message: string }> {
    const { data } = await api.patch<{ message: string }>(
      `/registration/${id}/finish`,
    );
    return data;
  }
}
