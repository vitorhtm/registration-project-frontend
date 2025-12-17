import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success';
  }
  
  export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
    const baseClasses =
      'w-full py-2 rounded-lg font-semibold transition-colors disabled:opacity-50';
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
      secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      success: 'bg-green-500 text-white hover:bg-green-600',
    };
  
    return (
      <button className={`${baseClasses} ${variants[variant]}`} {...props}>
        {children}
      </button>
    );
  }
  