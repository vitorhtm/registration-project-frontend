'use client';

import { useRegistration } from '@/stores/registration.store';
import { IdentificationForm } from './steps/IdentificationForm';
import { DocumentForm } from './steps/DocumentForm';
import { ContactForm } from './steps/ContactForm';
import { AddressForm } from './steps/AddressForm';
import { ReviewForm } from './steps/ReviewForm';

export function StepRenderer({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <IdentificationForm />;
    case 1:
      return <DocumentForm />;
    case 2:
      return <ContactForm />;
    case 3:
      return <AddressForm />;
    case 4:
      return <ReviewForm />;
    default:
      return null;
  }
}
