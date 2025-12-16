'use client';

import { useEffect } from 'react';
import { useRegistration } from '@/src/stores/registration.store';
import { RegistrationStepper } from '@/src/components/stepper/RegistrationStepper';


export default function RegistrationPage() {
  const { initializeRegistration, currentStep } = useRegistration();

  useEffect(() => {
    initializeRegistration();
  }, []);

  return (
    <main style={{ padding: 16 }}>

        <h1>Cadastro</h1>
        <RegistrationStepper />

        <p>Etapa atual: {currentStep + 1}</p>
    </main>
  );
}
