import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#8875FF',
    primaryLight: '#9E8FFF',
    secondary: '#A3A3A3',
    background: '#FAFAFA', // Figma spec: Light mode background
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#8E8E93',
    textTertiary: '#AFAFAF',
    border: '#EDEDED',
    error: '#FF4949',
    success: '#00D09C',
    warning: '#FFD600',
    completed: '#AFAFAF',
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowMedium: 'rgba(0, 0, 0, 0.12)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    placeholder: '#B8B8B8',
    inputBackground: '#FFFFFF',
    divider: '#F0F0F0',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#8875FF',
    primaryLight: '#9E8FFF',
    secondary: '#A3A3A3',
    background: '#171823', // Figma spec: Dark mode background
    surface: '#1F202E',
    card: '#262738',
    text: '#FFFFFF',
    textSecondary: '#A3A3A3',
    textTertiary: '#8E8E93',
    border: '#3A3A3C',
    error: '#FF4949',
    success: '#00D09C',
    warning: '#FFD600',
    completed: '#6E6E6E',
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowMedium: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    placeholder: '#666666',
    inputBackground: '#262738',
    divider: '#2A2A2C',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
