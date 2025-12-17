'use client';

import { useEffect, useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { Registration } from '@/types/registration';
import { StepContainer } from '@/components/ui/StepContainer';
import { Button } from '@/components/ui/Button';

export function ReviewForm() {
  const { registrationId, resetRegistration, setCurrentStep } = useRegistration();

  const [data, setData] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!registrationId) return;
      const response = await registrationService.findById(registrationId);
      setData(response);
    }

    load();
  }, [registrationId]);

async function handleFinish() {
  if (!registrationId) return;

  setLoading(true);

  try {
    await registrationService.finish(registrationId);

    // vai para o step de sucesso
    setCurrentStep(5);
  } finally {
    setLoading(false);
  }
}

  if (!data) return <p>Carregando...</p>;

  return (
    <StepContainer
      title="Revisão dos dados"
      description="Confira suas informações antes de concluir."
    >
      <h3>Identificação</h3>
      <p>Nome: {data.name}</p>
      <p>Email: {data.email}</p>

      <h3>Documento</h3>
      <p>{data.document}</p>

      <h3>Contato</h3>
      <p>{data.phone}</p>

      <h3>Endereço</h3>
      <p>CEP: {data.cep}</p>
      <p>Rua: {data.street}</p>
      <p>Número: {data.number}</p>
      <p>Cidade: {data.city}</p>
      <p>Estado: {data.state}</p>

      <Button onClick={handleFinish} disabled={loading}>
        {loading ? 'Finalizando...' : 'Concluir cadastro'}
      </Button>
    </StepContainer>
  );
}
