// components/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg'; // Size options
  variant?: 'primary' | 'secondary' | 'tertiary'; // Style variants
  asChild?: boolean; // For using it as a child of another component like <Link> or <a>
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  href, 
  className = '', 
  size = 'md', 
  variant = 'primary', 
  asChild = false 
}) => {
  // Define base button styles
  const baseStyle =
    'rounded-md transition duration-300';

  // Define size styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Define variant styles
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800',
    tertiary: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  const combinedClassNames = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // If `asChild` is true, render the button as a different component (like `a` or `Link`)
  if (asChild && href) {
    return (
      <a href={href} className={combinedClassNames} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassNames}>
      {children}
    </button>
  );
};

export default Button;
