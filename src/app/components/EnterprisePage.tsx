import React from "react";
import { Box, Typography, Button, IconButton, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HubIcon from "@mui/icons-material/Hub";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const XIcon = (props: any) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0.85, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ShieldSvg = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M100 20l60 25v45c0 35-25 55-60 70-35-15-60-35-60-70V45l60-25z"
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="1.5"
      fill="rgba(255,255,255,0.015)"
    />
    <path
      d="M100 40l40 17v30c0 23-17 37-40 47-23-10-40-24-40-47V57l40-17z"
      stroke="rgba(255,255,255,0.12)"
      strokeWidth="1"
      fill="none"
    />
    <rect x="88" y="90" width="24" height="28" rx="4" stroke="#a1a1aa" strokeWidth="1.5" fill="none" />
    <circle cx="100" cy="80" r="10" stroke="#a1a1aa" strokeWidth="1.5" fill="none" />
    <circle cx="100" cy="104" r="2" fill="#a1a1aa" />
  </svg>
);


const IntegrationsSvg = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="16" stroke="#a1a1aa" strokeWidth="1.5" fill="none" />
    <text x="100" y="105" textAnchor="middle" fill="#a1a1aa" fontSize="12" fontWeight="600">V</text>
    {[
      { x: 50, y: 50, label: "S" },
      { x: 150, y: 50, label: "J" },
      { x: 50, y: 150, label: "N" },
      { x: 150, y: 150, label: "G" },
    ].map((app, i) => (
      <React.Fragment key={i}>
        <circle cx={app.x} cy={app.y} r="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <text x={app.x} y={app.y + 4} textAnchor="middle" fill="#71717a" fontSize="10" fontWeight="600">{app.label}</text>
        <line
          x1={app.x + (app.x < 100 ? 12 : -12)}
          y1={app.y + (app.y < 100 ? 6 : -6)}
          x2={100 + (app.x < 100 ? -16 : 16)}
          y2={100 + (app.y < 100 ? -10 : 10)}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </React.Fragment>
    ))}
  </svg>
);


const enterpriseFeatures = [
  {
    title: "Privacy first",
    desc: "All data is processed locally in your browser. Nothing leaves your machine. No cloud dependency, no third-party access, no data residency concerns. Enterprise-grade security by architecture, not policy.",
    graphic: <ShieldSvg />,
  },
  {
    title: "Integrates everywhere",
    desc: "Slack, Jira, Notion, Confluence, GitHub. Connect the tools your team already uses with zero workflow changes. Vinculum ingests data from your existing stack and builds relationships automatically.",
    graphic: <IntegrationsSvg />,
  },
];

const EnterprisePage: React.FC = () => {
  const navigate = useNavigate();

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
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
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
            {["Features", "Enterprise", "Pricing"].map((label) => (
              <Typography
                key={label}
                onClick={() => {
                  if (label === "Enterprise") return;
                  navigate("/");
                }}
                sx={{
                  fontSize: "0.875rem",
                  color: label === "Enterprise" ? "#fafafa" : "#a1a1aa",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fafafa" },
                }}
              >
                {label}
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

      {/* Enterprise Hero */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 8, md: 14 },
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
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              mb: 2,
            }}
          >
            Enterprise
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              maxWidth: 700,
              mx: "auto",
              letterSpacing: "-0.03em",
            }}
          >
            Built for teams that can't afford{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                textDecorationColor: alpha("#ffffff", 0.25),
                textUnderlineOffset: "6px",
                textDecorationThickness: "2px",
              }}
            >
              information gaps
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              color: "#a1a1aa",
              maxWidth: 520,
              mx: "auto",
              mb: 5,
              lineHeight: 1.7,
            }}
          >
            Security, scale, and seamless integration for organizations that treat knowledge as infrastructure.
          </Typography>
          <Button
            variant="contained"
            size="large"
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
            Contact Sales
          </Button>
        </MotionBox>
      </Box>

      {/* Feature Rows */}
      {enterpriseFeatures.map((feature, i) => (
        <Box
          key={feature.title}
          sx={{
            borderTop: "1px solid",
            borderColor: alpha("#ffffff", 0.06),
            bgcolor: i % 2 === 1 ? alpha("#ffffff", 0.015) : "transparent",
          }}
        >
          <Box
            sx={{
              maxWidth: 1100,
              mx: "auto",
              px: { xs: 2, md: 4 },
              py: { xs: 6, md: 10 },
              display: "flex",
              flexDirection: {
                xs: "column",
                md: i % 2 === 0 ? "row" : "row-reverse",
              },
              alignItems: "center",
              gap: { xs: 4, md: 8 },
            }}
          >
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              sx={{ flex: 1 }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  mb: 1.5,
                }}
              >
                {`0${i + 1}`}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2,
                  letterSpacing: "-0.02em",
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  color: "#a1a1aa",
                  lineHeight: 1.8,
                  maxWidth: 480,
                }}
              >
                {feature.desc}
              </Typography>
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feature.graphic}
            </MotionBox>
          </Box>
        </Box>
      ))}

      {/* CTA Band */}
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
            textAlign: "center",
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.5rem", md: "2.25rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 2,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to connect your company's knowledge?
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#a1a1aa",
                mb: 4,
                maxWidth: 480,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Get a personalized demo and see how Vinculum fits your team's workflow.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
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
                Contact Sales
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/demo")}
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
                Try the Demo
              </Button>
            </Box>
          </MotionBox>
        </Box>
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

export default EnterprisePage;
