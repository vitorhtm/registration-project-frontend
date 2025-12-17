'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { StepContainer } from '@/components/ui/StepContainer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import axios from 'axios';

export function ContactForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidPhone(value: string) {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isValidPhone(phone)) {
      setError('Informe um telefone válido com DDD');
      return;
    }

    try {
      await registrationService.updatePhone(registrationId!, {
        phone,
      });

      goToNextStep();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message?.[0] ||
          err.response?.data?.message ||
          'Telefone inválido';

        setError(message);
      } else {
        setError('Erro inesperado ao salvar telefone');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepContainer
      title="Contato"
      description="Informe seu número de celular com DDD."
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Telefone"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {error && (
          <p style={{ color: 'red', marginTop: 8 }}>
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </Button>
      </form>
    </StepContainer>
  );
}
