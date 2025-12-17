'use client';

import { useRegistration } from '@/stores/registration.store';
import { RegistrationStepper } from '@/components/stepper/RegistrationStepper';
import { StepRenderer } from '@/components/registration/StepRenderer';
import './page.css';

export default function RegistrationPage() {
  const { currentStep } = useRegistration();

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Cadastro</h1>

        <RegistrationStepper />

        <div className="content">
          <StepRenderer step={currentStep} />
        </div>
      </div>
    </div>
  );
}
