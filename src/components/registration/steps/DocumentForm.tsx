'use client';

import { useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { StepContainer } from '@/components/ui/StepContainer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function DocumentForm() {
  const { registrationId, goToNextStep } = useRegistration();

  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(false);

  function clean(value: string) {
    return value.replace(/\D/g, '');
  }

  function isValidDocument(value: string) {
    const cleaned = clean(value);
    return cpf.isValid(cleaned) || cnpj.isValid(cleaned);
  }

  const invalid = document.length > 0 && !isValidDocument(document);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (invalid || !registrationId) return;

    setLoading(true);

    try {
      await registrationService.updateDocument(registrationId, {
        document: clean(document),
      });

      goToNextStep();
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepContainer
    
      title="Documento"
      description="Informe seu CPF ou CNPJ."
    >
      <form onSubmit={handleSubmit}
       style={{
        width: '100%',
        maxWidth: '400px', /* Limita a largura máxima */
      }}>
        <Input
          label="CPF ou CNPJ"
          placeholder="Digite apenas números"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />

        {invalid && (
          <p style={{ color: 'red', marginTop: 8 }}>
            CPF ou CNPJ inválido
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading || invalid}
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </Button>
      </form>
    </StepContainer>
  );
}
