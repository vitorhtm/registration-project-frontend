'use client';

import { useEffect, useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { Registration } from '@/types/registration';
import { StepContainer } from '@/components/ui/StepContainer';
import { Button } from '@/components/ui/Button';

export function ReviewForm() {
  const { registrationId,  setCurrentStep } = useRegistration();

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

      setCurrentStep(5);
    } finally {
      setLoading(false);
    }
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
          {title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {children}
        </div>
      </div>
    );
  }

  function Item({ label, value }: { label: string; value?: string }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span style={{ color: '#71717a' }}>{label}</span>
        <span style={{ fontWeight: 500 }}>{value || '-'}</span>
      </div>
    );
  }


  if (!data) return <p>Carregando...</p>;

  return (
    <StepContainer
      title="Revisão dos dados"
      description="Confira suas informações antes de concluir."
    >
      <Section title="Identificação">
        <Item label="Nome" value={data.name} />
        <Item label="E-mail" value={data.email} />
      </Section>

      <Section title="Documento">
        <Item label="Documento" value={data.document} />
      </Section>

      <Section title="Contato">
        <Item label="Telefone" value={data.phone} />
      </Section>

      <Section title="Endereço">
        <Item label="CEP" value={data.cep} />
        <Item label="Rua" value={data.street} />
        <Item label="Número" value={data.number} />
        <Item label="Cidade" value={data.city} />
        <Item label="Estado" value={data.state} />
      </Section>


      <div style={{ marginTop: 24 }}>
        <Button onClick={handleFinish} disabled={loading}>
          {loading ? 'Finalizando...' : 'Concluir cadastro'}
        </Button>
      </div>
    </StepContainer>
  );
}
