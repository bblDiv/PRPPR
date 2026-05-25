import React, { useRef, useMemo, useState } from "react";
import { Box, Typography, Button, IconButton, alpha } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HubIcon from "@mui/icons-material/Hub";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIconMui from "@mui/icons-material/Search";

const XIcon = (props: any) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
    <circle cx="12" cy="12" r="4" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="28" cy="12" r="4" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="20" cy="30" r="4" stroke="#38bdf8" strokeWidth="1.5" />
    <line x1="15.5" y1="14" x2="24.5" y2="14" stroke="#38bdf8" strokeWidth="1.5" />
    <line x1="14" y1="15.5" x2="18" y2="26.5" stroke="#38bdf8" strokeWidth="1.5" />
    <line x1="26" y1="15.5" x2="22" y2="26.5" stroke="#38bdf8" strokeWidth="1.5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="18" cy="18" r="8" stroke="#38bdf8" strokeWidth="1.5" />
    <line x1="24" y1="24" x2="32" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 14l2 2 4-4" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SyncIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M28 14a8 8 0 01-1 11.3" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 26a8 8 0 011-11.3" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="28,10 28,14 24,14" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12,30 12,26 16,26" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 6l12 5v9c0 7-5 11-12 14C13 31 8 27 8 20v-9l12-5z" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="17" y="17" width="6" height="7" rx="1" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="20" cy="14" r="3" stroke="#38bdf8" strokeWidth="1.5" />
  </svg>
);

interface ConstellationNode {
  x: number;
  y: number;
  r: number;
  color: string;
  duration: number;
  delay: number;
  icon?: string;
}

const HeroConstellation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  const nodes = useMemo<ConstellationNode[]>(() => {
    const seed = [
      { x: 80, y: 60, r: 4 },
      { x: 150, y: 30, r: 3 },
      { x: 220, y: 80, r: 5, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
      { x: 300, y: 45, r: 3 },
      { x: 370, y: 70, r: 4, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg" },
      { x: 440, y: 35, r: 3 },
      { x: 120, y: 130, r: 3 },
      { x: 190, y: 160, r: 5, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
      { x: 260, y: 120, r: 6, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
      { x: 340, y: 150, r: 4 },
      { x: 410, y: 110, r: 3, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg" },
      { x: 60, y: 200, r: 3 },
      { x: 140, y: 230, r: 4, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
      { x: 230, y: 210, r: 3 },
      { x: 310, y: 240, r: 5, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
      { x: 400, y: 200, r: 4 },
      { x: 460, y: 170, r: 3 },
      { x: 100, y: 280, r: 3 },
      { x: 200, y: 270, r: 4 },
      { x: 280, y: 180, r: 3, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg" },
      { x: 350, y: 260, r: 3 },
      { x: 430, y: 250, r: 4, icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
      { x: 170, y: 100, r: 2 },
      { x: 380, y: 90, r: 2 },
      { x: 250, y: 50, r: 2 },
      { x: 330, y: 200, r: 2 },
      { x: 480, y: 140, r: 2 },
    ];
    // Sky blue and light cyan shades
    const colors = ["#38bdf8", "#7dd3fc", "#0ea5e9", "#0284c7", "#bae6fd", "#ffffff", "#e0f2fe"];
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

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 540;
    const y = ((e.clientY - rect.top) / rect.height) * 310;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: -1000, y: -1000 });
  };

  const mouseLines = useMemo(() => {
    if (mouse.x < 0 || mouse.y < 0) return [];
    return nodes
      .map((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return { n, dist };
      })
      .filter((item) => item.dist < 110)
      .map((item) => ({
        x1: item.n.x,
        y1: item.n.y,
        x2: mouse.x,
        y2: mouse.y,
        opacity: (110 - item.dist) / 110,
        color: item.n.color,
      }));
  }, [mouse, nodes]);

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
          background: "radial-gradient(ellipse at center, rgba(16,185,129,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 540 310"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          cursor: "crosshair",
        }}
      >
        {lines.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1"
          />
        ))}

        {/* Dynamic Data Pulses flowing through the Web of Slacks */}
        {lines.filter((_, idx) => idx % 4 === 0).map((l, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="1.8"
            fill="#38bdf8"
            style={{ filter: "drop-shadow(0 0 4px #38bdf8)" }}
            animate={{
              cx: [l.x1, l.x2],
              cy: [l.y1, l.y2],
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.7,
            }}
          />
        ))}

        {mouseLines.map((ml, i) => (
          <line
            key={`ml-${i}`}
            x1={ml.x1}
            y1={ml.y1}
            x2={ml.x2}
            y2={ml.y2}
            stroke={ml.color}
            strokeWidth="1.2"
            opacity={ml.opacity * 0.55}
          />
        ))}

        {nodes.map((n, i) => {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isNearMouse = dist < 70;

          return (
            <g key={`n-${i}`}>
              {isNearMouse && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.icon ? 16 : n.r + 6}
                  fill={n.color}
                  opacity="0.25"
                  style={{ transition: "r 0.2s", filter: "blur(1px)" }}
                />
              )}
              {n.icon ? (
                <g>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isNearMouse ? 12 : 9.5}
                    fill="#1d251a"
                    stroke={n.color}
                    strokeWidth="1.5"
                    style={{ transition: "all 0.2s" }}
                  />
                  <image
                    href={n.icon}
                    x={n.x - (isNearMouse ? 7 : 5.5)}
                    y={n.y - (isNearMouse ? 7 : 5.5)}
                    width={isNearMouse ? 14 : 11}
                    height={isNearMouse ? 14 : 11}
                    style={{ filter: "invert(1)" }}
                  />
                </g>
              ) : (
                <motion.circle
                  cx={n.x}
                  r={isNearMouse ? n.r + 2 : n.r}
                  fill={n.color}
                  opacity={n.r > 3 ? 0.95 : 0.6}
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
              )}
            </g>
          );
        })}

        {mouse.x >= 0 && (
          <g>
            <circle
              cx={mouse.x}
              cy={mouse.y}
              r="14"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
              opacity="0.4"
              style={{ pointerEvents: "none" }}
            />
            <circle
              cx={mouse.x}
              cy={mouse.y}
              r="4"
              fill="#38bdf8"
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
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

const DashboardMockup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  const rotateX = useTransform(smoothProgress, [0, 0.4], [16, 0]);
  const scale = useTransform(smoothProgress, [0, 0.4], [0.88, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.35], [0.5, 1]);
  const translateY = useTransform(smoothProgress, [0, 0.4], [60, 0]);

  const [searchText, setSearchText] = useState("");
  const [showResult, setShowResult] = useState(false);

  React.useEffect(() => {
    const textToType = "stripe integration query";
    let index = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      setShowResult(false);
      setSearchText("");
      index = 0;
      
      const type = () => {
        if (index <= textToType.length) {
          setSearchText(textToType.slice(0, index));
          index++;
          timer = setTimeout(type, 110);
        } else {
          timer = setTimeout(() => {
            setShowResult(true);
            timer = setTimeout(startTyping, 6000);
          }, 800);
        }
      };
      
      timer = setTimeout(type, 1500);
    };

    startTyping();
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        perspective: 1200,
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
        mb: 8,
      }}
    >
      <MotionBox
        style={{
          rotateX,
          scale,
          opacity,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        sx={{
          width: "100%",
          height: { xs: 360, md: 540 },
          borderRadius: "16px",
          border: "1px solid rgba(20, 184, 166, 0.16)",
          background: "linear-gradient(135deg, rgba(8, 22, 18, 0.6) 0%, rgba(3, 7, 6, 0.95) 100%)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(20, 184, 166, 0.04)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 1.5,
            borderBottom: "1px solid rgba(20, 184, 166, 0.08)",
            bgcolor: "rgba(3, 7, 6, 0.5)",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ef4444", opacity: 0.7 }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#eab308", opacity: 0.7 }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#22c55e", opacity: 0.7 }} />
          </Box>
          <Box
            sx={{
              bgcolor: "rgba(20, 184, 166, 0.05)",
              border: "1px solid rgba(20, 184, 166, 0.1)",
              borderRadius: "20px",
              px: 4,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              width: { xs: 180, sm: 280 },
              justifyContent: "center"
            }}
          >
            <SearchIconMui sx={{ fontSize: 13, color: "#14b8a6" }} />
            <Typography sx={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#99f6e4", letterSpacing: "0.02em" }}>
              {searchText}
              <Box component="span" sx={{ display: "inline-block", width: 6, height: 12, bgcolor: "#14b8a6", ml: 0.5, animation: "blink 1s step-end infinite", "@keyframes blink": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } } }} />
            </Typography>
          </Box>
          <Box sx={{ width: 40 }} />
        </Box>

        <Box sx={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
          <Box
            sx={{
              width: { xs: 100, sm: 200 },
              borderRight: "1px solid rgba(20, 184, 166, 0.08)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              bgcolor: "rgba(3, 7, 6, 0.2)"
            }}
          >
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#0f766e", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Data Sources
            </Typography>
            {[
              { label: "Slack Ingestion", icon: "💬", status: "Active", time: "1s ago" },
              { label: "Jira Webhook", icon: "🎫", status: "Syncing", time: "5s ago" },
              { label: "Notion Sync", icon: "📄", status: "Idle", time: "1m ago" },
            ].map((source, i) => (
              <Box
                key={i}
                sx={{
                  p: 1.2,
                  borderRadius: "8px",
                  bgcolor: "rgba(20, 184, 166, 0.03)",
                  border: "1px solid rgba(20, 184, 166, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontSize: "0.85rem" }}>{source.icon}</Typography>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: "#f0fdfa", display: { xs: "none", sm: "block" } }}>
                    {source.label}
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: source.status === "Active" ? "#38bdf8" : source.status === "Syncing" ? "#0ea5e9" : "#6b7280" }} />
                    <Typography sx={{ fontSize: "0.55rem", color: "#99f6e4" }}>{source.status}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.55rem", color: "#0f766e" }}>{source.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ flex: 1, position: "relative", overflow: "hidden", p: 3 }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.04) 0%, transparent 60%)",
                pointerEvents: "none"
              }}
            />

            <svg
              viewBox="0 0 500 350"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            >
              {[
                { x1: 250, y1: 170, x2: 120, y2: 80, delay: 0.1 },
                { x1: 250, y1: 170, x2: 380, y2: 90, delay: 0.3 },
                { x1: 250, y1: 170, x2: 180, y2: 260, delay: 0.2 },
                { x1: 250, y1: 170, x2: 340, y2: 250, delay: 0.4 },
                { x1: 120, y1: 80, x2: 180, y2: 260, delay: 0.5 },
                { x1: 380, y1: 90, x2: 340, y2: 250, delay: 0.6 },
              ].map((edge, idx) => (
                <g key={`edge-${idx}`}>
                  <line
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke={showResult && idx % 3 === 0 ? "#06b6d4" : "rgba(20, 184, 166, 0.08)"}
                    strokeWidth={showResult && idx % 3 === 0 ? 2 : 1.2}
                    style={{ transition: "stroke 0.8s, stroke-width 0.8s" }}
                  />
                  {showResult && idx % 3 === 0 && (
                    <motion.circle
                      r="3"
                      fill="#06b6d4"
                      animate={{
                        cx: [edge.x1, edge.x2],
                        cy: [edge.y1, edge.y2],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: edge.delay,
                      }}
                    />
                  )}
                </g>
              ))}

              <circle
                cx={250}
                cy={170}
                r={showResult ? 16 : 12}
                fill="#030706"
                stroke={showResult ? "#06b6d4" : "#14b8a6"}
                strokeWidth={2}
                style={{ transition: "all 0.5s" }}
              />
              <circle
                cx={250}
                cy={170}
                r={showResult ? 6 : 4}
                fill={showResult ? "#06b6d4" : "#14b8a6"}
                style={{ transition: "all 0.5s" }}
              />
              <text x={250} y={148} textAnchor="middle" fill="#f0fdfa" fontSize="9" fontWeight="600" fontFamily="monospace">
                STripe migration
              </text>

              {[
                { x: 120, y: 80, name: "Marcus Rivera", type: "Person", color: "#14b8a6", active: true },
                { x: 380, y: 90, name: "Stripe Ingestion", type: "Concept", color: "#06b6d4", active: true },
                { x: 180, y: 260, name: "Database Migration", type: "Concept", color: "#14b8a6", active: false },
                { x: 340, y: 250, name: "Fraud Model v3", type: "Project", color: "#38bdf8", active: false },
              ].map((node, idx) => (
                <g key={`node-${idx}`}>
                  {node.active && showResult && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={14}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={1}
                      opacity={0.4}
                      style={{ animation: "pulse 2s infinite" }}
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={8}
                    fill="#030706"
                    stroke={showResult && node.active ? node.color : "rgba(20, 184, 166, 0.4)"}
                    strokeWidth={2}
                    style={{ transition: "all 0.5s" }}
                  />
                  <text
                    x={node.x}
                    y={node.y - 12}
                    textAnchor="middle"
                    fill={showResult && node.active ? "#f0fdfa" : "#99f6e4"}
                    opacity={showResult && node.active ? 1 : 0.6}
                    fontSize="8"
                    fontWeight="500"
                    fontFamily="sans-serif"
                    style={{ transition: "all 0.5s" }}
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>

            <Box
              sx={{
                position: "absolute",
                bottom: showResult ? 16 : -200,
                left: { xs: 16, sm: 32 },
                right: { xs: 16, sm: 32 },
                bgcolor: "rgba(8, 22, 18, 0.9)",
                border: "1px solid rgba(20, 184, 166, 0.2)",
                borderRadius: "12px",
                p: 2,
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                transition: "bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s",
                opacity: showResult ? 1 : 0,
              }}
            >
              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#14b8a6", letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.5 }}>
                AI Synthesized Context
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "#f0fdfa", lineHeight: 1.4 }}>
                "Marcus Rivera is migrating the <strong>Payment Service</strong> to Stripe API v3. This directly impacts the feature set of <strong>Fraud Detection ML model v3</strong> trained by Elena Volkov, as the new webhook payload adds 12 additional transaction features."
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                <Box sx={{ bgcolor: "rgba(20, 184, 166, 0.1)", px: 1, py: 0.3, borderRadius: "4px", border: "1px solid rgba(20, 184, 166, 0.15)" }}>
                  <Typography sx={{ fontSize: "0.55rem", fontFamily: "monospace", color: "#99f6e4" }}>Slack: #payments-stripe</Typography>
                </Box>
                <Box sx={{ bgcolor: "rgba(20, 184, 166, 0.1)", px: 1, py: 0.3, borderRadius: "4px", border: "1px solid rgba(20, 184, 166, 0.15)" }}>
                  <Typography sx={{ fontSize: "0.55rem", fontFamily: "monospace", color: "#99f6e4" }}>Jira: ML-302</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </MotionBox>
    </Box>
  );
};

const PlanetaryWorkflow: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const planetConfigs = [
    {
      num: "01",
      title: "Ingest",
      desc: "Connect Slack, Jira, and Notion. Vinculum pulls conversations, tickets, and docs automatically.",
      baseColor: "#0284c7",
      glowColor: "#38bdf8",
      continentColor: "#0369a1",
      rotationDuration: 16,
    },
    {
      num: "02",
      title: "Extract",
      desc: "AI identifies entities, relationships, and decisions. GraphRAG builds a structured knowledge graph.",
      baseColor: "#5b21b6",
      glowColor: "#c084fc",
      continentColor: "#4c1d95",
      rotationDuration: 22,
    },
    {
      num: "03",
      title: "Explore",
      desc: "Navigate a 3D visualization. Ask questions. Get answers with traced provenance.",
      baseColor: "#047857",
      glowColor: "#34d399",
      continentColor: "#064e3b",
      rotationDuration: 12,
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        my: 8,
        px: { xs: 2, md: 4 },
      }}
    >
      <style>{`
        @keyframes orbit-sat {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rocket-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -40; }
        }
      `}</style>

      {/* Connection Rocket Trails - Desktop only */}
      <Box
        sx={{
          position: "absolute",
          top: 70, // vertical center of planet spheres
          left: "12%",
          right: "12%",
          height: 100,
          zIndex: 1,
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 760 100" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="trailGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="trailGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          
          {/* Connection 1: Ingest to Extract */}
          <path
            d="M 40,50 Q 190,10 340,50"
            stroke="rgba(56, 189, 248, 0.06)"
            strokeWidth="3"
            strokeDasharray="4 6"
          />
          <path
            d="M 40,50 Q 190,10 340,50"
            stroke="url(#trailGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 18"
            style={{
              animation: "rocket-flow 2.5s linear infinite",
            }}
          />

          {/* Connection 2: Extract to Explore */}
          <path
            d="M 420,50 Q 570,90 720,50"
            stroke="rgba(192, 132, 252, 0.06)"
            strokeWidth="3"
            strokeDasharray="4 6"
          />
          <path
            d="M 420,50 Q 570,90 720,50"
            stroke="url(#trailGrad2)"
            strokeWidth="2.5"
            strokeDasharray="6 18"
            style={{
              animation: "rocket-flow 2.5s linear infinite",
            }}
          />
        </svg>
      </Box>

      {/* Connection Trails - Mobile only (Vertical) */}
      <Box
        sx={{
          position: "absolute",
          top: 90,
          bottom: 90,
          left: "50%",
          transform: "translateX(-50%)",
          width: 40,
          zIndex: 1,
          display: { xs: "block", md: "none" },
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 500" preserveAspectRatio="none" fill="none">
          <path
            d="M 20,20 Q 0,130 20,240 T 20,480"
            stroke="rgba(56, 189, 248, 0.08)"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          <path
            d="M 20,20 Q 0,130 20,240 T 20,480"
            stroke="url(#trailGrad1)"
            strokeWidth="2"
            strokeDasharray="6 16"
            style={{
              animation: "rocket-flow 3s linear infinite",
            }}
          />
        </svg>
      </Box>

      {/* Planets Flex Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 8, md: 4 },
        }}
      >
        {planetConfigs.map((cfg, idx) => {
          const isHovered = hoveredStep === idx;

          return (
            <Box
              key={idx}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => navigate("/demo")}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: 260, md: 240 },
                cursor: "pointer",
              }}
            >
              {/* Planet Sphere Wrapper */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  position: "relative",
                  width: 140,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Planet Glow Aura */}
                <Box
                  sx={{
                    position: "absolute",
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${cfg.glowColor} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.7 : 0.28,
                    transition: "all 0.4s ease",
                    pointerEvents: "none",
                    filter: "blur(3px)",
                  }}
                />

                {/* SVG Sphere */}
                <svg width="110" height="110" viewBox="0 0 100 100" style={{ transform: "rotate(-15deg)", overflow: "visible" }}>
                  <defs>
                    <clipPath id={`clip-${idx}`}>
                      <circle cx="50" cy="50" r="42" />
                    </clipPath>
                    <radialGradient id={`shade-${idx}`} cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                      <stop offset="35%" stopColor="transparent" stopOpacity="0" />
                      <stop offset="85%" stopColor="#000000" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
                    </radialGradient>
                    <linearGradient id={`base-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={cfg.glowColor} />
                      <stop offset="100%" stopColor={cfg.baseColor} />
                    </linearGradient>
                  </defs>

                  {/* Base Sphere */}
                  <circle cx="50" cy="50" r="42" fill={`url(#base-${idx})`} />

                  {/* Rotating surface details clipped inside sphere */}
                  <g clipPath={`url(#clip-${idx})`}>
                    <motion.g
                      animate={{ x: [-100, 0] }}
                      transition={{ duration: cfg.rotationDuration, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Surface map repeated twice for seamless loop */}
                      <g opacity="0.68">
                        <path d="M10,40 Q25,30 40,45 T75,35 T90,55 L90,65 Q70,75 50,55 T10,60 Z" fill={cfg.continentColor} />
                        <path d="M15,15 Q30,10 45,20 T70,10 L70,25 Q50,30 30,20 Z" fill={cfg.continentColor} />
                        <circle cx="25" cy="75" r="5" fill={cfg.continentColor} />
                        <circle cx="65" cy="75" r="4" fill={cfg.continentColor} />
                        <circle cx="80" cy="20" r="3" fill={cfg.continentColor} />
                      </g>
                      <g opacity="0.68" transform="translate(100, 0)">
                        <path d="M10,40 Q25,30 40,45 T75,35 T90,55 L90,65 Q70,75 50,55 T10,60 Z" fill={cfg.continentColor} />
                        <path d="M15,15 Q30,10 45,20 T70,10 L70,25 Q50,30 30,20 Z" fill={cfg.continentColor} />
                        <circle cx="25" cy="75" r="5" fill={cfg.continentColor} />
                        <circle cx="65" cy="75" r="4" fill={cfg.continentColor} />
                        <circle cx="80" cy="20" r="3" fill={cfg.continentColor} />
                      </g>
                    </motion.g>
                  </g>

                  {/* 3D Sphere Shading Overlay */}
                  <circle cx="50" cy="50" r="42" fill={`url(#shade-${idx})`} style={{ mixBlendMode: "multiply" }} />

                  {/* Atmosphere outer ring */}
                  <circle cx="50" cy="50" r="42" stroke={cfg.glowColor} strokeWidth="1.2" fill="none" opacity="0.8" />

                  {/* Ring for Explore planet (Idx 2) */}
                  {idx === 2 && (
                    <g transform="rotate(20 50 50)" opacity="0.85">
                      <ellipse cx="50" cy="50" rx="58" ry="10" stroke={cfg.glowColor} strokeWidth="2.5" fill="none" style={{ filter: `drop-shadow(0 0 5px ${cfg.glowColor})` }} />
                    </g>
                  )}

                  {/* Satellite orbiting Extract planet (Idx 1) */}
                  {idx === 1 && (
                    <g style={{ animation: "orbit-sat 8s linear infinite", transformOrigin: "50px 50px" }}>
                      <circle cx="92" cy="50" r="4" fill={cfg.glowColor} style={{ filter: `drop-shadow(0 0 3px ${cfg.glowColor})` }} />
                    </g>
                  )}
                </svg>

                {/* Coordinate ring orbiting Ingest planet (Idx 0) */}
                {idx === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: 125,
                      height: 125,
                      borderRadius: "50%",
                      border: `1.2px dashed ${alpha(cfg.glowColor, 0.4)}`,
                      animation: "orbit-sat 25s linear infinite",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </motion.div>

              {/* Title / Heading */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#fafafa",
                  mt: 2,
                  textShadow: `0 0 12px ${alpha(cfg.glowColor, 0.6)}`,
                  textAlign: "center",
                  letterSpacing: "0.05em",
                }}
              >
                {cfg.title}
              </Typography>

              {/* Step indicator */}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: cfg.glowColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mt: 0.5,
                }}
              >
                Step {cfg.num}
              </Typography>

              {/* Hover Pop-up Card */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={
                  isHovered
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 15, scale: 0.9 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                style={{
                  position: "absolute",
                  bottom: "105%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 280,
                  zIndex: 100,
                  pointerEvents: isHovered ? "auto" : "none",
                }}
              >
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: "14px",
                    border: `1.5px solid ${alpha(cfg.glowColor, 0.25)}`,
                    bgcolor: "rgba(29, 37, 26, 0.95)",
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 12px 32px rgba(0, 0, 0, 0.8), 0 0 20px ${alpha(cfg.glowColor, 0.15)}`,
                    textAlign: "center",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderWidth: "8px",
                      borderStyle: "solid",
                      borderColor: `rgba(29, 37, 26, 0.95) transparent transparent transparent`,
                    }
                  }}
                >
                  <Typography sx={{ fontSize: "0.825rem", color: "#f8fafc", lineHeight: 1.6 }}>
                    {cfg.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

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
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent", color: "#f0fdf4" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          bgcolor: alpha("#212a1e", 0.75),
          borderBottom: "1px solid",
          borderColor: alpha("#38bdf8", 0.08),
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
              href="https://github.com/bblDiv/vinculum"
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
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3.5 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.12 }}
              style={{
                display: "inline-block",
                filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.45))",
                cursor: "pointer",
                transition: "filter 0.3s"
              }}
            >
              <svg width="64" height="64" viewBox="-32 -32 64 64" fill="none">
                <defs>
                  <linearGradient id="leafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#047857" />
                    <stop offset="45%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <filter id="cloverGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Stem */}
                <path d="M0,0 C0,15 -8,25 -18,28" stroke="#047857" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M0,0 C0,15 -8,25 -18,28" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
                
                {/* Leaves with gradient & glow */}
                <g filter="url(#cloverGlow)">
                  {[0, 90, 180, 270].map((angle) => (
                    <g key={angle} transform={`rotate(${angle})`}>
                      <path
                        d="M0,0 C-12,-8 -16,-20 -6,-24 C-2,-25 0,-21 0,-21 C0,-21 2,-25 6,-24 C16,-20 12,-8 0,0"
                        fill="url(#leafGrad)"
                        stroke="#7dd3fc"
                        strokeWidth="0.8"
                      />
                      {/* Leaf vein lines for details */}
                      <path d="M0,0 L0,-16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                      <path d="M0,-6 C-3,-9 -7,-10 -9,-10" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                      <path d="M0,-6 C3,-9 7,-10 9,-10" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                    </g>
                  ))}
                </g>
                {/* Center bud */}
                <circle cx="0" cy="0" r="3.2" fill="#7dd3fc" />
              </svg>
            </motion.div>
          </Box>
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
                background: "linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontWeight: 800,
                filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.35))",
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

          <HeroConstellation />
        </MotionBox>
      </Box>

      <DashboardMockup />

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
            background: "linear-gradient(to right, #212a1e, transparent)",
            zIndex: 2,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, #212a1e, transparent)",
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
                color: "#38bdf8",
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
                  textDecorationColor: alpha("#38bdf8", 0.45),
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
                    borderColor: alpha("#38bdf8", 0.2),
                    bgcolor: alpha("#38bdf8", 0.03),
                    boxShadow: `0 0 20px ${alpha("#38bdf8", 0.04)}`,
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
                color: "#38bdf8",
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
                  textDecorationColor: alpha("#38bdf8", 0.45),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                total clarity
              </Box>
            </Typography>
          </MotionBox>

          <PlanetaryWorkflow />

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
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#38bdf8", 0.08),
          bgcolor: alpha("#1d251a", 0.35),
          py: 8,
          mt: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {/* Left Column: Brand & Download */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
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
            <Typography sx={{ fontSize: "0.85rem", color: "#a1a1aa", maxWidth: 360, lineHeight: 1.6 }}>
              The next-generation GraphRAG knowledge visualization engine. Connect Slack, Jira, and Notion into a unified, interactive team brain.
            </Typography>
            
            {/* Get Vinculum Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Get Vinculum
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AppleIcon />}
                  href="https://github.com/bblDiv/vinculum/releases"
                  target="_blank"
                  sx={{
                    borderColor: "rgba(56, 189, 248, 0.2)",
                    color: "#fafafa",
                    fontSize: "0.75rem",
                    "&:hover": {
                      borderColor: "#38bdf8",
                      bgcolor: "rgba(56, 189, 248, 0.04)",
                    },
                  }}
                >
                  Download App (macOS & Windows)
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/demo")}
                  sx={{
                    bgcolor: "#fafafa",
                    color: "#09090b",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#e4e4e7" },
                  }}
                >
                  Launch Web Demo
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Right Column: Connect & Links */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 260 }}>
            {/* Social Icons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Connect with the Author
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <IconButton
                  href="https://www.linkedin.com/in/divye-rawat-463064375/"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    color: "#a1a1aa", 
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "rgba(255,255,255,0.01)",
                    "&:hover": { 
                      color: "#38bdf8",
                      borderColor: "rgba(56, 189, 248, 0.3)",
                      bgcolor: "rgba(56, 189, 248, 0.04)"
                    } 
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  href="https://github.com/bblDiv"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    color: "#a1a1aa", 
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "rgba(255,255,255,0.01)",
                    "&:hover": { 
                      color: "#38bdf8",
                      borderColor: "rgba(56, 189, 248, 0.3)",
                      bgcolor: "rgba(56, 189, 248, 0.04)"
                    } 
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  href="https://x.com/Daktardtm"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    color: "#a1a1aa", 
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "rgba(255,255,255,0.01)",
                    "&:hover": { 
                      color: "#38bdf8",
                      borderColor: "rgba(56, 189, 248, 0.3)",
                      bgcolor: "rgba(56, 189, 248, 0.04)"
                    } 
                  }}
                >
                  <XIcon style={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", mb: 0.5 }}>
                  Navigation
                </Typography>
                <Typography onClick={() => navigate("/")} sx={{ fontSize: "0.8rem", color: "#71717a", cursor: "pointer", "&:hover": { color: "#fafafa" } }}>
                  Home
                </Typography>
                <Typography onClick={() => navigate("/enterprise")} sx={{ fontSize: "0.8rem", color: "#71717a", cursor: "pointer", "&:hover": { color: "#fafafa" } }}>
                  Enterprise
                </Typography>
                <Typography onClick={() => navigate("/demo")} sx={{ fontSize: "0.8rem", color: "#71717a", cursor: "pointer", "&:hover": { color: "#fafafa" } }}>
                  Live Demo
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom copyright line */}
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            mt: 6,
            pt: 3,
            borderTop: "1px solid",
            borderColor: alpha("#ffffff", 0.04),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#52525b" }}>
            &copy; {new Date().getFullYear()} Vinculum. Built by bblDiv.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
