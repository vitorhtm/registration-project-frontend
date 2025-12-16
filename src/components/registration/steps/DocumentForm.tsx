'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';

export function DocumentForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(false);

  function onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationService.updateDocument(registrationId!, {
        document: onlyNumbers(document),
      });

      goToNextStep();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Documento</h2>

      <div>
        <label>CPF ou CNPJ</label>
        <input
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Digite CPF ou CNPJ"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Próximo'}
      </button>
    </form>
  );
}
