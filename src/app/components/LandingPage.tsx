import React, { useRef, useMemo } from "react";
import { Box, Typography, Button, IconButton, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HubIcon from "@mui/icons-material/Hub";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const KnowledgeGraphIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="12" cy="12" r="4" stroke="#a1a1aa" strokeWidth="1.5" />
    <circle cx="28" cy="12" r="4" stroke="#a1a1aa" strokeWidth="1.5" />
    <circle cx="20" cy="30" r="4" stroke="#a1a1aa" strokeWidth="1.5" />
    <line x1="15.5" y1="14" x2="24.5" y2="14" stroke="#a1a1aa" strokeWidth="1.5" />
    <line x1="14" y1="15.5" x2="18" y2="26.5" stroke="#a1a1aa" strokeWidth="1.5" />
    <line x1="26" y1="15.5" x2="22" y2="26.5" stroke="#a1a1aa" strokeWidth="1.5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="18" cy="18" r="8" stroke="#a1a1aa" strokeWidth="1.5" />
    <line x1="24" y1="24" x2="32" y2="32" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 14l2 2 4-4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SyncIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M28 14a8 8 0 01-1 11.3" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 26a8 8 0 011-11.3" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="28,10 28,14 24,14" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12,30 12,26 16,26" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6l12 5v9c0 7-5 11-12 14C13 31 8 27 8 20v-9l12-5z" stroke="#a1a1aa" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="17" y="17" width="6" height="7" rx="1" stroke="#a1a1aa" strokeWidth="1.5" />
    <circle cx="20" cy="14" r="3" stroke="#a1a1aa" strokeWidth="1.5" />
  </svg>
);

interface ConstellationNode {
  x: number;
  y: number;
  r: number;
  color: string;
  duration: number;
  delay: number;
}

const HeroConstellation: React.FC = () => {
  const nodes = useMemo<ConstellationNode[]>(() => {
    const seed = [
      { x: 80, y: 60, r: 4 },
      { x: 150, y: 30, r: 3 },
      { x: 220, y: 80, r: 5 },
      { x: 300, y: 45, r: 3 },
      { x: 370, y: 70, r: 4 },
      { x: 440, y: 35, r: 3 },
      { x: 120, y: 130, r: 3 },
      { x: 190, y: 160, r: 5 },
      { x: 260, y: 120, r: 6 },
      { x: 340, y: 150, r: 4 },
      { x: 410, y: 110, r: 3 },
      { x: 60, y: 200, r: 3 },
      { x: 140, y: 230, r: 4 },
      { x: 230, y: 210, r: 3 },
      { x: 310, y: 240, r: 5 },
      { x: 400, y: 200, r: 4 },
      { x: 460, y: 170, r: 3 },
      { x: 100, y: 280, r: 3 },
      { x: 200, y: 270, r: 4 },
      { x: 280, y: 180, r: 3 },
      { x: 350, y: 260, r: 3 },
      { x: 430, y: 250, r: 4 },
      { x: 170, y: 100, r: 2 },
      { x: 380, y: 90, r: 2 },
      { x: 250, y: 50, r: 2 },
      { x: 330, y: 200, r: 2 },
      { x: 480, y: 140, r: 2 },
    ];
    const colors = ["#f59e0b", "#fbbf24", "#ffffff", "#d97706", "#f59e0b", "#fbbf24", "#ffffff"];
    return seed.map((s, i) => ({
      ...s,
      color: colors[i % colors.length],
      duration: 4 + (i % 5) * 1.2,
      delay: (i % 7) * 0.4,
    }));
  }, []);

  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          result.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 540,
        mx: "auto",
        mt: 6,
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <svg viewBox="0 0 540 310" style={{ width: "100%", height: "auto", display: "block" }}>
        {lines.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="rgba(251,191,36,0.12)"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            r={n.r}
            fill={n.color}
            opacity={n.r > 3 ? 0.9 : 0.5}
            animate={{
              cy: [n.y, n.y + 4, n.y - 3, n.y],
            }}
            transition={{
              duration: n.duration,
              delay: n.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </Box>
  );
};

const features = [
  {
    icon: <KnowledgeGraphIcon />,
    title: "Knowledge Graph",
    desc: "Transform scattered conversations, tickets, and docs into a unified graph of relationships your team can navigate visually.",
  },
  {
    icon: <SearchIcon />,
    title: "AI-Powered Search",
    desc: "Ask natural language questions. The AI traverses your knowledge graph and surfaces answers with full source context.",
  },
  {
    icon: <SyncIcon />,
    title: "Real-time Sync",
    desc: "Changes in Slack, Jira, or Notion appear in your graph within seconds. Always current, never stale.",
  },
  {
    icon: <ShieldIcon />,
    title: "Privacy First",
    desc: "All processing happens locally in your browser. Zero data leaves your machine. Enterprise-grade security by architecture.",
  },
];

const steps = [
  {
    num: "1",
    title: "Ingest",
    desc: "Connect Slack, Jira, and Notion. Vinculum pulls conversations, tickets, and pages automatically.",
  },
  {
    num: "2",
    title: "Extract",
    desc: "AI identifies entities, relationships, and decisions. GraphRAG builds a structured knowledge graph.",
  },
  {
    num: "3",
    title: "Explore",
    desc: "Navigate a 3D visualization. Ask questions. Get answers with traced provenance.",
  },
];

const stats = [
  { value: "100K+", label: "Nodes supported" },
  { value: "3", label: "Integrations" },
  { value: "< 2s", label: "Query time" },
  { value: "0", label: "Data uploaded" },
];

const integrationLogos = [
  { name: "Slack", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
  { name: "Jira", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg" },
  { name: "Notion", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
  { name: "Confluence", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/confluence.svg" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" },
  { name: "Microsoft Teams", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftteams.svg" },
  { name: "Google Drive", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googledrive.svg" },
  { name: "Linear", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linear.svg" },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Features", action: () => scrollTo(featuresRef) },
    { label: "Enterprise", action: () => navigate("/enterprise") },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#09090b", color: "#fafafa" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          bgcolor: alpha("#09090b", 0.8),
          borderBottom: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, md: 4 },
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HubIcon sx={{ fontSize: 20, color: "#09090b" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#fafafa" }}
            >
              Vinculum
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                onClick={item.action}
                sx={{
                  fontSize: "0.875rem",
                  color: "#a1a1aa",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fafafa" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              href="https://github.com/bblDiv/PRPPR"
              target="_blank"
              rel="noopener"
              sx={{ color: "#a1a1aa", "&:hover": { color: "#fafafa" } }}
            >
              <GitHubIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Button
              variant="contained"
              onClick={() => navigate("/demo")}
              sx={{
                bgcolor: "#fafafa",
                color: "#09090b",
                px: 3,
                py: 1,
                fontSize: "0.875rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "#e4e4e7" },
              }}
            >
              Try Demo
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              lineHeight: 1.08,
              mb: 3,
              maxWidth: 720,
              mx: "auto",
              letterSpacing: "-0.03em",
            }}
          >
            Your company's scattered knowledge,{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                textDecorationColor: alpha("#60a5fa", 0.6),
                textUnderlineOffset: "6px",
                textDecorationThickness: "3px",
              }}
            >
              connected
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.25rem" },
              color: "#a1a1aa",
              maxWidth: 560,
              mx: "auto",
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            Transform Slack conversations, Jira tickets, and Notion docs into one
            searchable, interactive knowledge graph.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/demo")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#fafafa",
                color: "#09090b",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "#e4e4e7" },
              }}
            >
              Try the Live Demo
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollTo(featuresRef)}
              sx={{
                borderColor: alpha("#ffffff", 0.15),
                color: "#fafafa",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  borderColor: alpha("#ffffff", 0.3),
                  bgcolor: alpha("#ffffff", 0.04),
                },
              }}
            >
              Learn More
            </Button>
          </Box>

        </MotionBox>
      </Box>

      {/* Integration Marquee */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          py: 4,
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, #09090b, transparent)",
            zIndex: 2,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, #09090b, transparent)",
            zIndex: 2,
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#52525b",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            mb: 2,
          }}
        >
          Connects with your stack
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 6,
            animation: "marquee 25s linear infinite",
            width: "max-content",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...integrationLogos, ...integrationLogos].map((logo, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={logo.url}
                alt={logo.name}
                sx={{
                  width: 24,
                  height: 24,
                  opacity: 0.5,
                  filter: "invert(1)",
                }}
              />
              <Typography sx={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                {logo.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features */}
      <Box
        ref={featuresRef}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#60a5fa",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                mb: 2,
                textAlign: "center",
              }}
            >
              Features
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 6,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Everything you need to{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#60a5fa", 0.45),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                connect the dots
              </Box>
            </Typography>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {features.map((f, i) => (
              <MotionBox
                key={f.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: alpha("#ffffff", 0.06),
                  bgcolor: alpha("#ffffff", 0.02),
                  transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    borderColor: alpha("#60a5fa", 0.2),
                    bgcolor: alpha("#60a5fa", 0.03),
                    boxShadow: `0 0 20px ${alpha("#60a5fa", 0.04)}`,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 700, color: "#fafafa", mb: 1 }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.9rem", color: "#a1a1aa", lineHeight: 1.7 }}
                >
                  {f.desc}
                </Typography>
              </MotionBox>
            ))}
          </MotionBox>
        </Box>
      </Box>

      {/* How It Works */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          bgcolor: alpha("#ffffff", 0.015),
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#60a5fa",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                mb: 2,
                textAlign: "center",
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 8,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Three steps to{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#60a5fa", 0.45),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                total clarity
              </Box>
            </Typography>
          </MotionBox>

          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "flex-start" },
              justifyContent: "center",
              gap: { xs: 4, md: 0 },
              position: "relative",
            }}
          >
            {steps.map((step, i) => (
              <React.Fragment key={step.num}>
                <MotionBox
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    px: { xs: 0, md: 3 },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "1.5px solid",
                      borderColor: alpha("#60a5fa", 0.3),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "1rem", fontWeight: 700, color: "#60a5fa" }}
                    >
                      {step.num}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#fafafa", mb: 1 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#a1a1aa",
                      lineHeight: 1.6,
                      maxWidth: 280,
                      mx: "auto",
                    }}
                  >
                    {step.desc}
                  </Typography>
                </MotionBox>
                {i < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                      pt: 3,
                    }}
                  >
                    <svg width="60" height="2" viewBox="0 0 60 2">
                      <line
                        x1="0"
                        y1="1"
                        x2="60"
                        y2="1"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                      />
                    </svg>
                  </Box>
                )}
              </React.Fragment>
            ))}
          </MotionBox>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/demo")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#fafafa",
                color: "#09090b",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "#e4e4e7" },
              }}
            >
              See It in Action
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats Strip */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          bgcolor: alpha("#ffffff", 0.015),
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {stats.map((stat, i) => (
            <Box
              key={stat.label}
              sx={{
                flex: { xs: "1 1 50%", md: "1 1 0" },
                textAlign: "center",
                py: { xs: 3, md: 0 },
                borderRight:
                  i < stats.length - 1
                    ? { xs: "none", md: `1px solid ${alpha("#ffffff", 0.08)}` }
                    : "none",
                borderBottom:
                  i < 2
                    ? { xs: `1px solid ${alpha("#ffffff", 0.06)}`, md: "none" }
                    : "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 800,
                  color: "#fafafa",
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          py: { xs: 10, md: 14 },
          textAlign: "center",
        }}
      >
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          sx={{ maxWidth: 600, mx: "auto", px: 2 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to connect your knowledge?
          </Typography>
          <Typography sx={{ color: "#a1a1aa", mb: 4, fontSize: "1.05rem" }}>
            See how Vinculum transforms scattered data into actionable insight.
          </Typography>
          <Button
            onClick={() => navigate("/demo")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#fafafa",
              color: "#09090b",
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": { bgcolor: "#e4e4e7" },
            }}
          >
            Start Free Trial
          </Button>
        </MotionBox>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "0.8rem", color: "#52525b" }}>
            Vinculum
          </Typography>
          <IconButton
            href="https://github.com/bblDiv/PRPPR"
            target="_blank"
            rel="noopener"
            sx={{ color: "#52525b", "&:hover": { color: "#a1a1aa" } }}
            size="small"
          >
            <GitHubIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
