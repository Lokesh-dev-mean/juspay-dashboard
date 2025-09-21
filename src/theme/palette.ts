import type { ThemeOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: string;
    tableHeader?: string;
    tableBody?: string;
    tableRowBorder?: string;
    tableHeaderBorder?: string;
    inputBorder?: string; 
  }
  interface TypeText {
    disabledButton?: string;
    border?: string;
    divider?: string;
  }
  interface TypeBackground {
    input?: string;
    chart?: string;
    icon?: string;
  } 
  
}

export const lightPalette: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: "#8A8CD9", // Primary/Brand
    light: "#A8ACD9", // Primary/Light
    dark: "#4A4A85",  // darker tone if needed
  },
  secondary: {
    main: "#59ABD4", // Secondary/Blue
    light: "#A8C8D9", // Secondary/Cyan
    dark: "#4AA785",  // Secondary/Green alternative
  },
  neutral: "rgba(28,28,28,0.2)",
  tableHeader: "rgba(28,28,28,0.4)",
  tableBody: "rgba(28,28,28,1)",
  tableRowBorder: "rgba(28,28,28,0.05)",
  tableHeaderBorder: "rgba(28,28,28,0.1)",
  inputBorder: "rgba(28,28,28,0.1)",


  background: {
    default: "#FFFFFF", // White/100%
    paper: "#ffffff",   
    input: "rgba(28, 28, 28, 0.05)",
    chart: "rgba(247, 249, 251, 1)",
    icon: "rgba(229, 236, 246, 1)",
  },
  text: {
    primary: "#000000",   // Black/100%
    secondary: "rgba(0,0,0,0.6)", // Black/60%
    disabled: "rgba(0,0,0,0.4)",  // Black/40%
    disabledButton: "rgba(0,0,0,0.2)",  // Black/20%
    border: "rgba(0,0,0,0.1)",  // Black/10%
    divider: "rgba(28, 28, 28, 0.2)",  // Black/10%
    
  },
  error: {
    main: "#FF5555", // Red tone (from figma)
  },
  warning: {
    main: "#FFC555", // Yellow
  },
  success: {
    main: "#4AA785", // Green
  },
  info: {
    main: "#59ABD4", // Cyan/Blue
  },
};

export const darkPalette: ThemeOptions["palette"] = {
  mode: "dark",
  primary: {
    main: "#8A8CD9", // Primary/Brand
    light: "#A8ACD9",
    dark: "#4A4A85",
    
  },
  secondary: {
    main: "#59ABD4", // Secondary/Blue
    light: "#A8C8D9",
    dark: "#4AA785", // Secondary/Green
  },
  neutral: "rgba(28,28,28,0.2)",
  background: {
    default: "#121212", // Dark bg (Black/100%)
    paper: "#1C1C1C",   // Dark gray (Black/80%)
    chart: "rgba(255, 255, 255, 0.05)",
    input: "rgba(255,255,255,0.1)",
    icon: "rgba(227, 245, 255, 1)",
  },
  text: {
    primary: "#FFFFFF",  // White/100%
    secondary: "rgba(255,255,255,0.7)", // White/70%
    disabled: "rgba(255,255,255,0.5)",  // White/50%
    disabledButton: "rgba(255,255,255,0.2)",  // White/20%
    border: "rgba(255,255,255,0.1)",  // White/10%
    divider: "rgba(255,255,255,0.1)",  // White/10%
  },
  tableHeader: "rgba(255, 255, 255, 0.4)",
  tableBody: "rgba(255, 255, 255, 1)",
  tableRowBorder: "rgba(255, 255, 255, 0.1)",
  tableHeaderBorder: "rgba(255, 255, 255, 0.2)",
  inputBorder: "rgba(255,255,255,0.1)",

  error: {
    main: "#FF5555",
  },
  warning: {
    main: "#FFC555",
  },
  success: {
    main: "#4AA785",
  },
  info: {
    main: "#59ABD4",
  },
};
