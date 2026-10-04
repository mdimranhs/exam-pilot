import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className = '',
}) => {
  const baseButton = 'rounded-xl flex-row items-center justify-center';

  const variantContainer = {
    primary: 'bg-indigo-600 active:bg-indigo-700',
    secondary: 'bg-slate-800 active:bg-slate-900 dark:bg-slate-700',
    outline: 'border border-slate-300 bg-transparent active:bg-slate-100 dark:border-slate-700 dark:active:bg-slate-800',
    danger: 'bg-rose-600 active:bg-rose-700',
    ghost: 'bg-transparent active:bg-slate-100 dark:active:bg-slate-800',
  };

  const variantText = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-slate-800 dark:text-slate-200 font-semibold',
    danger: 'text-white font-semibold',
    ghost: 'text-indigo-600 dark:text-indigo-400 font-semibold',
  };

  const sizeContainer = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2.5',
    lg: 'px-5 py-3.5',
  };

  const sizeText = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseButton} ${variantContainer[variant]} ${sizeContainer[size]} ${disabled ? 'opacity-50' : ''} ${className}`}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#4f46e5' : '#ffffff'}
        />
      ) : (
        <View className="flex-row items-center">
          {icon ? <View className="mr-2">{icon}</View> : null}
          <Text className={`${variantText[variant]} ${sizeText[size]}`}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
