import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const LightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primaryText: "black",
      secondaryText: "grey",

      primary: "#1976d2",
      secondary: "#42a5f5",
      tertiary: "#1565c0",

      primaryContainer: "white",
      secondaryContainer: "white",
      onPrimaryContainer: "white",

      primaryButton: "#1976d2",
      background: "white",
    },
};
  
export const DarkTheme = {
    ...MD3DarkTheme,
    colors: {
      primaryText: "white",
      secondaryText: "grey",

      primary: "#424549",
      secondary: "#36393F",

      primaryContainer: "#424549",
      secondaryContainer: "#36393F",
      onPrimaryContainer: "#616469",

      primaryButton: "#616469",
      background: "#23272a",
    },
};
