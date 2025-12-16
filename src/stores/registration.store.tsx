'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { registrationService } from '@/services/registration.service';


interface RegistrationContextData {
  registrationId: string | null;
  currentStep: number;
  initializeRegistration: () => Promise<void>;
  goToNextStep: () => void;
  setCurrentStep: (step: number) => void;
  resetRegistration: () => void;
}


const RegistrationContext = createContext<RegistrationContextData | undefined>(
  undefined,
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  function goToNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function resetRegistration() {
    setRegistrationId(null);
    setCurrentStep(0);
  
    localStorage.removeItem('registrationId');
    localStorage.removeItem('registrationStep');
  }

  // Recupera estado salvo
  useEffect(() => {
    const storedId = localStorage.getItem('registrationId');
    const storedStep = localStorage.getItem('registrationStep');

    if (storedId) setRegistrationId(storedId);
    if (storedStep) setCurrentStep(Number(storedStep));
  }, []);

  // Persiste estado
  useEffect(() => {
    if (registrationId !== null) {
      localStorage.setItem('registrationId', registrationId);
      localStorage.setItem('registrationStep', String(currentStep));
    }
  }, [registrationId, currentStep]);

  // Cria ou recupera rascunho
  async function initializeRegistration() {
    if (registrationId) return;

    const registration = await registrationService.create();
    setRegistrationId(registration.id);
  }

  return (
    <RegistrationContext.Provider
      value={{
        registrationId,
        currentStep,
        setCurrentStep,
        initializeRegistration,
        goToNextStep,
        resetRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}


export function useRegistration(): RegistrationContextData {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      'useRegistration must be used within a RegistrationProvider'
    );
  }

  return context;
}
