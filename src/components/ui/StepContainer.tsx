import React from 'react';
import './step-container.css';

interface StepContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function StepContainer({
  title,
  description,
  children,
}: StepContainerProps) {
  return (
    <div className="step-container">
      <h2 className="step-title">{title}</h2>

      {description && (
        <p className="step-description">{description}</p>
      )}

      {children}
    </div>
  );
}
