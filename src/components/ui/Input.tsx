import React from 'react';
import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input className="input" {...props} />
    </div>
  );
}
