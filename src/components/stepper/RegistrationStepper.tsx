'use client';

import { useRegistration } from '@/stores/registration.store';

const steps = [
  'Identificação',
  'Documento',
  'Contato',
  'Endereço',
  'Revisão',
];

export function RegistrationStepper() {
  const { currentStep } = useRegistration();

  return (
    <ol style={{ listStyle: 'none', padding: 0 }}>
      {steps.map((label, index) => (
        <li
          key={label}
          style={{
            padding: '12px 8px',
            marginBottom: 8,
            borderLeft:
              index === currentStep ? '4px solid #1677ff' : '4px solid #ddd',
            background: index === currentStep ? '#f0f5ff' : '#fafafa',
          }}
        >
          <strong>{index + 1}.</strong> {label}
        </li>
      ))}
    </ol>
  );
}
