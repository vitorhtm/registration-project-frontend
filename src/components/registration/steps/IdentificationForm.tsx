'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';

export function IdentificationForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationService.updateIdentification(registrationId!, {
        name,
        email,
      });

      goToNextStep();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Identificação</h2>

      <div>
        <label>Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Próximo'}
      </button>
    </form>
  );
}
