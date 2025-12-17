import { useState, useEffect } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';

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

  async function fetchAddress(cep: string) {
    try {
      setCepLoading(true);
      const address = await registrationService.getAddressByCep(cep);

      console.log(address)
      setStreet(address.street || '');
      setNeighborhood(address.neighborhood || '');
      setCity(address.city || '');
      setState(address.state || '');
    } catch (error) {
      console.error('Erro ao buscar CEP', error);
    } finally {
      setCepLoading(false);
    }
  }

  useEffect(() => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      fetchAddress(cleanedCep);
    }
  }, [cep]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationService.updateAddress(registrationId!, {
        cep,
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Endereço</h2>

      <div>
        <label>CEP</label>
        <input
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        />
        {cepLoading && <p>Buscando endereço...</p>}
      </div>

      <div>
        <label>Rua</label>
        <input value={street} onChange={(e) => setStreet(e.target.value)} required />
      </div>

      <div>
        <label>Número</label>
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>

      <div>
        <label>Complemento</label>
        <input value={complement} onChange={(e) => setComplement(e.target.value)} />
      </div>

      <div>
        <label>Bairro</label>
        <input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required />
      </div>

      <div>
        <label>Cidade</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>

      <div>
        <label>Estado</label>
        <input value={state} onChange={(e) => setState(e.target.value)} required />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Próximo'}
      </button>
    </form>
  );
}
