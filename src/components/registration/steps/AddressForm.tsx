'use client';

import { useState, useEffect } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { StepContainer } from '@/components/ui/StepContainer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import axios from 'axios';

export function AddressForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);


  async function fetchAddress(cep: string) {
    try {
      setCepLoading(true);
      setCepError(null);

      const address = await registrationService.getAddressByCep(cep);

      setStreet(address.street || '');
      setNeighborhood(address.neighborhood || '');
      setCity(address.city || '');
      setState(address.state || '');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setCepError(
          error.response?.data?.message || 'Erro ao buscar CEP'
        );
      } else {
        setCepError('Erro inesperado ao buscar CEP');
      }

      // limpa os campos se der erro
      setStreet('');
      setNeighborhood('');
      setCity('');
      setState('');
    } finally {
      setCepLoading(false);
    }
  }

  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetchAddress(cleanCep);
    } else {
      setCepError(null);
    }
  }, [cep]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationService.updateAddress(registrationId!, {
        cep: cep.replace(/\D/g, ''),
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      });

      goToNextStep();
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    !loading &&
    !cepLoading &&
    !cepError &&
    cep.replace(/\D/g, '').length === 8;


  return (
    <StepContainer
      title="Endereço"
      description="Informe seu endereço residencial."
    >
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            inputMode="numeric"
            maxLength={9}
          />

          {cepLoading && (
            <p style={{ fontSize: 14, marginTop: 4 }}>
              Buscando endereço...
            </p>
          )}

          {cepError && (
            <p style={{ color: 'red', fontSize: 14, marginTop: 4 }}>
              {cepError}
            </p>
          )}
        </div>


        <Input
          label="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />

        <Input
          label="Número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <Input
          label="Complemento"
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
        />

        <Input
          label="Bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          required
        />

        <Input
          label="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <Input
          label="Estado"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <Button type="submit" disabled={!canSubmit}>
          {loading ? 'Salvando...' : 'Próximo'}
        </Button>
      </form>
    </StepContainer>
  );
}
