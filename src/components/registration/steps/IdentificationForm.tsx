'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { StepContainer } from '@/components/ui/StepContainer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function IdentificationForm() {
  const { registrationId, setRegistrationId, setCurrentStep, currentStep } = useRegistration();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!registrationId) {
        const registration = await registrationService.create({ name, email });
        if (registration?.id) setRegistrationId(registration.id);
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
    <StepContainer title="Identificação" description="Preencha seu nome e e-mail para continuar.">
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Próximo'}
        </Button>
      </form>
    </StepContainer>
  );
}
