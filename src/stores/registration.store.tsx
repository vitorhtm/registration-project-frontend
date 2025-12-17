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
  initializeRegistration: (payload: { name: string; email: string }) => Promise<void>;
  goToNextStep: () => void;
  setCurrentStep: (step: number) => void;
  resetRegistration: () => void;
  setRegistrationId: (id: string) => void;
}

const RegistrationContext = createContext<RegistrationContextData | undefined>(
  undefined,
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedId = localStorage.getItem('registrationId');
    const storedStep = localStorage.getItem('registrationStep');

    if (storedId) setRegistrationId(storedId);
    if (storedStep) setCurrentStep(Number(storedStep));
  }, []);

useEffect(() => {
  if (!registrationId) return; 
  if (typeof window === 'undefined') return;

  localStorage.setItem('registrationId', registrationId);
  localStorage.setItem('registrationStep', String(currentStep));
}, [registrationId, currentStep]);


  function goToNextStep() {
    setCurrentStep(currentStep + 1);
  }

  function resetRegistration() {
    setRegistrationId(null);
    setCurrentStep(0);

    if (typeof window === 'undefined') return;
    localStorage.removeItem('registrationId');
    localStorage.removeItem('registrationStep');
  }

  async function initializeRegistration(payload: { name: string; email: string }) {
    if (registrationId) return;

    const registration = await registrationService.create(payload);
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
        setRegistrationId,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration(): RegistrationContextData {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
