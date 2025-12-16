'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { RegistrationService } from '@/src/services/registration.service';

type RegistrationContextData = {
  registrationId: string | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  initializeRegistration: () => Promise<void>;
};

const RegistrationContext = createContext<RegistrationContextData | undefined>(
  undefined,
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Recupera estado salvo
  useEffect(() => {
    const storedId = localStorage.getItem('registrationId');
    const storedStep = localStorage.getItem('registrationStep');

    if (storedId) setRegistrationId(storedId);
    if (storedStep) setCurrentStep(Number(storedStep));
  }, []);

  // Persiste estado
  useEffect(() => {
    if (registrationId) {
      localStorage.setItem('registrationId', registrationId);
    }
    localStorage.setItem('registrationStep', String(currentStep));
  }, [registrationId, currentStep]);

  // Cria ou recupera rascunho
  async function initializeRegistration() {
    if (registrationId) return;

    const registration = await RegistrationService.create();
    setRegistrationId(registration.id);
  }

  return (
    <RegistrationContext.Provider
      value={{
        registrationId,
        currentStep,
        setCurrentStep,
        initializeRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      'useRegistration must be used within a RegistrationProvider',
    );
  }

  return context;
}
