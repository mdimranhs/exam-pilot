import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
}) => {
  const isDark = useColorScheme() === 'dark';

  const containerStyle = [
    styles.baseContainer,
    size === 'sm' ? styles.smContainer : styles.mdContainer,
    isDark ? darkStyles[variant] : lightStyles[variant],
  ];

  const textStyle = [
    styles.baseText,
    size === 'sm' ? styles.smText : styles.mdText,
    isDark ? darkTextStyles[variant] : lightTextStyles[variant],
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  smContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mdContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  baseText: {
    fontWeight: '700',
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
});

const lightStyles = StyleSheet.create({
  primary: { backgroundColor: '#eef2ff', borderColor: '#c7d2fe' },
  success: { backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' },
  warning: { backgroundColor: '#fffbeb', borderColor: '#fde68a' },
  danger: { backgroundColor: '#fff1f2', borderColor: '#fecdd3' },
  neutral: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
});

const darkStyles = StyleSheet.create({
  primary: { backgroundColor: '#1e1b4b', borderColor: '#3730a3' },
  success: { backgroundColor: '#064e3b', borderColor: '#065f46' },
  warning: { backgroundColor: '#451a03', borderColor: '#78350f' },
  danger: { backgroundColor: '#4c0519', borderColor: '#881337' },
  neutral: { backgroundColor: '#1e293b', borderColor: '#334155' },
});

const lightTextStyles = StyleSheet.create({
  primary: { color: '#4338ca' },
  success: { color: '#047857' },
  warning: { color: '#b45309' },
  danger: { color: '#be123c' },
  neutral: { color: '#475569' },
});

const darkTextStyles = StyleSheet.create({
  primary: { color: '#a5b4fc' },
  success: { color: '#6ee7b7' },
  warning: { color: '#fcd34d' },
  danger: { color: '#fda4af' },
  neutral: { color: '#cbd5e1' },
});
