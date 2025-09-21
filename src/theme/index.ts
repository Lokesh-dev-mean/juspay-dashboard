import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import { typography } from "./typography";

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
});
