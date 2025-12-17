'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';

export function IdentificationForm() {
  const { registrationId, setRegistrationId, setCurrentStep, currentStep } = useRegistration();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let registration;

      if (!registrationId) {
        const registration = await registrationService.create({ name, email });
        if (registration?.id) {
          setRegistrationId(registration.id); // só seta se existir ID válido
        }
      } else {
        await registrationService.updateIdentification(registrationId, { name, email });
      }

      setCurrentStep(currentStep + 1);

    } catch (err) {
      console.error('Erro ao salvar identificação:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Identificação</h2>

      <div>
        <label>Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Próximo'}
      </button>
    </form>
  );
}
