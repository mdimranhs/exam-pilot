import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  variant = 'outlined',
  isSelected = false,
}) => {
  const isDark = useColorScheme() === 'dark';

  const baseStyles: (ViewStyle | false | undefined)[] = [
    styles.card,
    isDark ? styles.cardDark : styles.cardLight,
    variant === 'elevated' && (isDark ? styles.elevatedDark : styles.elevatedLight),
    variant === 'outlined' && (isDark ? styles.outlinedDark : styles.outlinedLight),
    variant === 'flat' && (isDark ? styles.flatDark : styles.flatLight),
    isSelected && (isDark ? styles.selectedDark : styles.selectedLight),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={baseStyles}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={baseStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
  cardDark: {
    backgroundColor: '#0f172a',
  },
  elevatedLight: {
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  elevatedDark: {
    borderWidth: 1,
    borderColor: '#1e293b',
    elevation: 2,
  },
  outlinedLight: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  outlinedDark: {
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  flatLight: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  flatDark: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedLight: {
    borderWidth: 2,
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
  },
  selectedDark: {
    borderWidth: 2,
    borderColor: '#6366f1',
    backgroundColor: '#1e1b4b',
  },
});
