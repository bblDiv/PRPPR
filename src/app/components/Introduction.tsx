import React from "react";
import {
  Typography,
  Box,
  Paper,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import SearchIcon from "@mui/icons-material/Search";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LockIcon from "@mui/icons-material/Lock";
import ChatIcon from "@mui/icons-material/Chat";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Introduction: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const accentGradient = "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)";
  const cardBg = isDark
    ? alpha(theme.palette.common.white, 0.04)
    : alpha(theme.palette.common.black, 0.02);
  const cardBorder = isDark
    ? alpha(theme.palette.common.white, 0.08)
    : alpha(theme.palette.common.black, 0.08);

  const features = [
    {
      icon: <ViewInArIcon sx={{ fontSize: 32 }} />,
      title: "3D Star Map",
      desc: "Every person, document, and conversation is a glowing node. Related items cluster into visual galaxies you can explore.",
      color: "#6366f1",
    },
    {
      icon: <SearchIcon sx={{ fontSize: 32 }} />,
      title: "AI-Powered Search",
      desc: "Ask natural language questions. The AI finds the answer and the camera flies through the graph to the solution.",
      color: "#8b5cf6",
    },
    {
      icon: <HubIcon sx={{ fontSize: 32 }} />,
      title: "Auto-Connected",
      desc: "A Slack message about a bug becomes linked to its Jira ticket and the Notion doc where the fix was documented.",
      color: "#a855f7",
    },
    {
      icon: <LockIcon sx={{ fontSize: 32 }} />,
      title: "Private & Secure",
      desc: "All data is processed locally. Nothing is uploaded to external servers. Your company knowledge stays yours.",
      color: "#7c3aed",
    },
  ];

  const sources = [
    {
      icon: <ChatIcon />,
      name: "Slack",
      desc: "Conversations & decisions",
      color: "#4A154B",
    },
    {
      icon: <BugReportIcon />,
      name: "Jira",
      desc: "Tickets & sprint work",
      color: "#0052CC",
    },
    {
      icon: <DescriptionIcon />,
      name: "Notion",
      desc: "Docs & runbooks",
      color: "#000000",
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", pb: 6 }}>
      {/* Hero */}
      <Box sx={{ textAlign: "center", mb: 6, mt: 2 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "18px",
            background: accentGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            boxShadow: `0 8px 32px ${alpha("#6366f1", 0.3)}`,
          }}
        >
          <HubIcon sx={{ fontSize: 40, color: "#fff" }} />
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: isDark ? accentGradient : "none",
            color: isDark ? "transparent" : theme.palette.text.primary,
            backgroundClip: isDark ? "text" : "unset",
            WebkitBackgroundClip: isDark ? "text" : "unset",
          }}
        >
          Vinculum
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Your company's scattered knowledge — connected into one searchable,
          visual brain.
        </Typography>
      </Box>

      {/* Demo notice */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 5,
          borderRadius: 3,
          background: alpha("#6366f1", isDark ? 0.1 : 0.05),
          border: `1px solid ${alpha("#6366f1", 0.2)}`,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Demo data loaded from{" "}
          <strong style={{ color: "#8b5cf6" }}>Orion Labs</strong> — a fictional
          engineering team. Explore their Slack conversations, Jira tickets, and
          Notion docs connected in the graph above.
        </Typography>
      </Paper>

      {/* The Problem → Solution */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Problem */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: cardBg,
              border: `1px solid ${cardBorder}`,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#ef4444", fontWeight: 700, letterSpacing: 1.5 }}
            >
              The Problem
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Information Chaos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Conversations on Slack. Tasks on Jira. Notes on Notion. A new
              employee searching for context has to dig through three apps. Hours
              wasted, every day.
            </Typography>
          </Paper>

          {/* Arrow */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <ArrowForwardIcon
              sx={{ fontSize: 28, color: theme.palette.text.disabled }}
            />
          </Box>

          {/* Solution */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: alpha("#6366f1", isDark ? 0.08 : 0.03),
              border: `1px solid ${alpha("#6366f1", 0.15)}`,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#6366f1", fontWeight: 700, letterSpacing: 1.5 }}
            >
              The Solution
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              A Connected Brain
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vinculum grabs data from all three and draws the connections
              automatically. One living map of everything your company knows and
              does.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Data Sources */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="overline"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 2,
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          Ingests From
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {sources.map((s) => (
            <Paper
              key={s.name}
              elevation={0}
              sx={{
                px: 3,
                py: 2,
                borderRadius: 3,
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 200,
              }}
            >
              <Box
                sx={{
                  color: isDark ? "#fff" : s.color,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {s.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {s.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.desc}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Feature Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2.5,
          mb: 6,
        }}
      >
        {features.map((f) => (
          <Paper
            key={f.title}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: alpha(f.color, 0.4),
              },
            }}
          >
            <Box sx={{ color: f.color, mb: 1.5 }}>{f.icon}</Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              {f.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {f.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* How it works */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="overline"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 3,
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          How It Works
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { step: "1", label: "Ingest", detail: "Webhooks pull data from Slack, Jira, Notion" },
            { step: "2", label: "Extract", detail: "AI identifies people, projects, and concepts" },
            { step: "3", label: "Connect", detail: "Relationships are drawn automatically" },
            { step: "4", label: "Explore", detail: "Search & visualize in an interactive 3D map" },
          ].map((s) => (
            <Box key={s.step} sx={{ textAlign: "center", flex: "1 1 160px", maxWidth: 200 }}>
              <Chip
                label={s.step}
                sx={{
                  background: accentGradient,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  width: 36,
                  height: 36,
                  mb: 1,
                  "& .MuiChip-label": { px: 0 },
                }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {s.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {s.detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Demo CTA */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Switch to the{" "}
          <Chip label="Graph Visualization" size="small" sx={{ mx: 0.5 }} /> tab
          to explore the Orion Labs knowledge graph, or browse raw data in{" "}
          <Chip label="Data Tables" size="small" sx={{ mx: 0.5 }} />.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Introduction;
