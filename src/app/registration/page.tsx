'use client';

import { useEffect } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { RegistrationStepper } from '@/components/stepper/RegistrationStepper';
import { StepRenderer } from '@/components/registration/StepRenderer';



export default function RegistrationPage() {
  const { initializeRegistration, currentStep } = useRegistration();

  useEffect(() => {
    initializeRegistration();
  }, []);

  return (
    <main style={{ padding: 16 }}>

        <h1>Cadastro</h1>
        <RegistrationStepper />
        <StepRenderer />
    </main>
  );
}
