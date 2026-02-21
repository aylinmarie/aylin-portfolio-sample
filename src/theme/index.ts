import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

export const palette = {
  // Primary — deep violet (yarn-inspired)
  violet50: '#F5F3FF',
  violet100: '#EDE9FE',
  violet200: '#DDD6FE',
  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  violet700: '#6D28D9',
  violet900: '#4C1D95',

  // Secondary — dusty rose
  rose300: '#FDA4AF',
  rose400: '#FB7185',
  rose500: '#F43F5E',

  // Neutral
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray700: '#3F3F46',
  gray900: '#18181B',

  // Accent teal
  teal400: '#2DD4BF',
  teal500: '#14B8A6',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.violet600,
    onPrimary: palette.white,
    primaryContainer: palette.violet100,
    onPrimaryContainer: palette.violet900,
    secondary: palette.rose500,
    onSecondary: palette.white,
    secondaryContainer: '#FFE4E8',
    onSecondaryContainer: '#4A0010',
    background: palette.gray50,
    onBackground: palette.gray900,
    surface: palette.white,
    onSurface: palette.gray900,
    surfaceVariant: palette.gray100,
    onSurfaceVariant: palette.gray700,
    outline: palette.gray200,
    elevation: {
      level0: 'transparent',
      level1: palette.gray50,
      level2: palette.gray100,
      level3: palette.gray200,
      level4: palette.gray200,
      level5: palette.gray200,
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.violet400,
    onPrimary: palette.violet900,
    primaryContainer: palette.violet700,
    onPrimaryContainer: palette.violet100,
    secondary: palette.rose300,
    onSecondary: '#5C0020',
    secondaryContainer: '#7C0030',
    onSecondaryContainer: '#FFD8DE',
    background: '#0F0E17',
    onBackground: '#E8E6F0',
    surface: '#1C1B27',
    onSurface: '#E8E6F0',
    surfaceVariant: '#26243A',
    onSurfaceVariant: '#CAC4D0',
    outline: '#49454F',
    elevation: {
      level0: 'transparent',
      level1: '#252235',
      level2: '#2B2840',
      level3: '#312E4B',
      level4: '#332F4E',
      level5: '#373356',
    },
  },
};

export type AppTheme = typeof lightTheme;
