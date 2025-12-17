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
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginBottom: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {steps.map((label, index) => {
        const active = index === currentStep;
        const completed = index < currentStep;

        return (
          <div
            key={label}
            style={{
              padding: '6px 10px',
              borderRadius: 20,
              fontSize: 12,
              backgroundColor: completed
                ? '#16a34a'
                : active
                ? '#111'
                : '#e5e5e5',
              color:
                completed || active ? '#fff' : '#111',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
