import React from 'react';

interface StepContainerProps {
    title: string;
    description?: string;
    children: React.ReactNode;
  }
  
  export function StepContainer({ title, description, children }: StepContainerProps) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          {description && <p className="text-gray-500 mb-6">{description}</p>}
          {children}
        </div>
      </div>
    );
  }
  