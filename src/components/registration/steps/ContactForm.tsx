'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';

export function ContactForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationService.updatePhone(registrationId!, {
        phone,
      });

      goToNextStep();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contato</h2>

      <div>
        <label>Telefone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="(11) 99999-9999"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Próximo'}
      </button>
    </form>
  );
}
