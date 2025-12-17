'use client';

import { StepContainer } from '@/components/ui/StepContainer';
import { Button } from '@/components/ui/Button';
import { useRegistration } from '@/stores/registration.store';

export function SuccessForm() {
  const { resetRegistration } = useRegistration();

  function handleNewRegistration() {
    resetRegistration();
  }

  return (
    <StepContainer
      title="Cadastro concluído 🎉"
      description="Seu cadastro foi realizado com sucesso."
    >
      <p style={{ marginBottom: 16 }}>
        Obrigado por completar o cadastro. Em breve entraremos em contato.
      </p>

      <Button variant="primary" onClick={handleNewRegistration}>
        Iniciar novo cadastro
      </Button>
    </StepContainer>
  );
}
