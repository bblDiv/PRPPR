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
import EnterprisePage from "../components/EnterprisePage";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#43543c", // RGB 67, 84, 60
      paper: "#1d251a",  // Darker forest green for panels
    },
    primary: {
      main: "#38bdf8", // Sky Blue Accent
      light: "#7dd3fc",
      dark: "#0284c7",
    },
    secondary: {
      main: "#bae6fd", // Soft Blue Accent
    },
    text: {
      primary: "#f8fafc", // Crisp clean slate-tinted white
      secondary: "#bae6fd", // Soft sky blue-grey
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          backgroundColor: "#43543c",
          backgroundImage: 
            "radial-gradient(circle at 50% -20%, #5d7554 0%, #212a1e 100%), " +
            "linear-gradient(rgba(56, 189, 248, 0.02) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(56, 189, 248, 0.02) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          backgroundAttachment: "fixed",
          color: "#f8fafc",
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
          backgroundColor: "#1d251a",
          backgroundImage: "none",
          borderLeft: "1px solid rgba(56, 189, 248, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
          <Route path="/enterprise" element={<EnterprisePage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
