export const Colors = {
  // Backgrounds
  background: '#0F0E17',
  surface: '#1A1933',
  surfaceElevated: '#221F3B',
  surfaceHighlight: '#2A2650',
  border: '#2E2B50',

  // Primary (indigo-violet gradient)
  primary: '#6C63FF',
  primaryDark: '#4F46E5',
  primaryLight: '#A78BFA',

  // Accent
  accent: '#F5A623',
  accentLight: '#FCD34D',

  // Semantic
  success: '#22C55E',
  successLight: '#4ADE80',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A8A3C8',
  textMuted: '#6B6890',
  textInverse: '#0F0E17',

  // Category Colors
  science: '#3B82F6',
  geography: '#10B981',
  history: '#F59E0B',
  technology: '#6C63FF',
  mathematics: '#EF4444',
  generalKnowledge: '#8B5CF6',
  nature: '#22C55E',
  entertainment: '#EC4899',

  // Difficulty colors
  easy: '#22C55E',
  medium: '#F59E0B',
  hard: '#EF4444',
  expert: '#9333EA',

  // Transparent
  overlay: 'rgba(15,14,23,0.85)',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.12)',
};

export const Gradients = {
  primary: ['#6C63FF', '#A855F7'] as const,
  splash: ['#0F0E17', '#1A1933', '#2D1B69'] as const,
  card: ['#1A1933', '#221F3B'] as const,
  success: ['#065F46', '#064E3B'] as const,
  error: ['#7F1D1D', '#991B1B'] as const,
  science: ['#1D4ED8', '#2563EB'] as const,
  geography: ['#047857', '#059669'] as const,
  history: ['#92400E', '#B45309'] as const,
  technology: ['#4338CA', '#6C63FF'] as const,
  mathematics: ['#B91C1C', '#DC2626'] as const,
  generalKnowledge: ['#5B21B6', '#7C3AED'] as const,
  nature: ['#14532D', '#15803D'] as const,
  entertainment: ['#9D174D', '#BE185D'] as const,
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 999,
};

export const Shadows = {
  sm: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};
