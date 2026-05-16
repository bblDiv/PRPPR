import React from "react";
import {
  CssBaseline,
  createTheme,
  darkScrollbar,
  ThemeProvider,
} from "@mui/material";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import DemoPage from "../components/DemoPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#09090b",
      paper: "#141416",
    },
    primary: {
      main: "#e2e8f0",
    },
    secondary: {
      main: "#94a3b8",
    },
    text: {
      primary: "#fafafa",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          backgroundColor: "#09090b",
        },
      },
    },
    MuiPopover: {
      styleOverrides: { root: { zIndex: 1600 } },
    },
    MuiModal: {
      styleOverrides: { root: { zIndex: 1600 } },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#141416",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
