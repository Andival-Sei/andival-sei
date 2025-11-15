import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';
import classNames from '@/lib/classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Компонент Button с поддержкой различных вариантов и размеров
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', className, children, ...props }, ref) => {
    const buttonClasses = classNames(
      styles.button,
      styles[variant],
      size !== 'medium' && styles[size],
      className
    );

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
