import React, { useRef } from "react";
import { Box, Typography, Button, IconButton, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HubIcon from "@mui/icons-material/Hub";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            {[
              { label: "Features", ref: featuresRef },
              { label: "Enterprise", ref: enterpriseRef },
              { label: "Pricing", ref: pricingRef },
            ].map((item) => (
              <Typography
                key={item.label}
                onClick={() => scrollTo(item.ref)}
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
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 16 },
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
                textDecorationColor: alpha("#ffffff", 0.3),
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
              mb: 5,
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

      {/* === FEATURES: The Problem === */}
      <Box
        ref={featuresRef}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 16 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              The Problem
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              Information chaos is costing your team{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#ffffff", 0.25),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                hours every week
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: "#a1a1aa",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Right now, company information is scattered across completely
              different apps. Conversations happen on Slack. Tasks are tracked on
              Jira. Notes are saved in Notion.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: "#a1a1aa",
                lineHeight: 1.8,
              }}
            >
              If a new employee wants to know why a piece of code was changed,
              they have to search all three apps separately. It's frustrating,
              error-prone, and wastes hours that should be spent building.
            </Typography>
          </MotionBox>
        </Box>
      </Box>

      {/* === The Solution === */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          bgcolor: alpha("#ffffff", 0.015),
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 16 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              The Solution
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              One living map of everything your company{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#ffffff", 0.25),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                knows and does
              </Box>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                "If a team talks about a software bug on Slack, Vinculum remembers it.",
                "If that bug becomes an official ticket on Jira, the app draws a digital line between the chat and the ticket.",
                "If an engineer fixes it and writes a guide in Notion, the app connects that engineer to the guide.",
              ].map((text, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: alpha("#ffffff", 0.2),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.3,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#a1a1aa" }}
                    >
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      color: "#a1a1aa",
                      lineHeight: 1.7,
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionBox>
        </Box>
      </Box>

      {/* === The 3D Star Map === */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 16 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              The Experience
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 4,
                letterSpacing: "-0.02em",
              }}
            >
              A 3D star map of your company's{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#ffffff", 0.25),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                entire brain
              </Box>
            </Typography>

            {[
              {
                label: "The Stars",
                text: "Every person, document, and conversation is a glowing node. Color-coded by type — green for people, blue for documents, red for issues — so you can read the map at a glance.",
              },
              {
                label: "The Connections",
                text: "Lines connect related nodes. If an engineer wrote a document, a line connects them. Related items naturally cluster together into visual galaxies.",
              },
              {
                label: "The AI Flight",
                text: 'Type a question like "Why is the payment system down?" and the AI finds the answer. The camera flies through 3D space, zooming into the exact cluster of nodes holding the solution.',
              },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  mb: i < 2 ? 4 : 0,
                  pl: 3,
                  borderLeft: "2px solid",
                  borderColor: alpha("#ffffff", 0.1),
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#fafafa",
                    mb: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    color: "#a1a1aa",
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/demo")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 5,
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
          </MotionBox>
        </Box>
      </Box>

      {/* === ENTERPRISE === */}
      <Box
        ref={enterpriseRef}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          bgcolor: alpha("#ffffff", 0.015),
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 16 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              variant="h3"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 4,
                letterSpacing: "-0.02em",
              }}
            >
              Built for teams that can't afford{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: alpha("#ffffff", 0.25),
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "2px",
                }}
              >
                information gaps
              </Box>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                {
                  title: "Privacy first",
                  desc: "All data is processed locally in your browser. Nothing leaves your machine. Enterprise-grade security by design.",
                },
                {
                  title: "Scales with you",
                  desc: "From 100 to 100,000 nodes. The graph engine handles massive datasets without breaking a sweat.",
                },
                {
                  title: "Integrates everywhere",
                  desc: "Slack, Jira, Notion, Confluence, GitHub — connect the tools your team already uses. No workflow changes required.",
                },
                {
                  title: "AI-powered extraction",
                  desc: "Automatically identifies people, projects, decisions, and their hidden connections across all your tools using GraphRAG.",
                },
              ].map((item, i) => (
                <Box key={i}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 700, color: "#fafafa", mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      color: "#a1a1aa",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionBox>
        </Box>
      </Box>

      {/* === PRICING === */}
      <Box
        ref={pricingRef}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 16 },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                textAlign: "center",
              }}
            >
              Pricing
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
              Simple, transparent pricing
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 2,
              }}
            >
              {[
                {
                  name: "Starter",
                  price: "Free",
                  desc: "For individuals exploring their data",
                  features: [
                    "Up to 1,000 nodes",
                    "Local processing",
                    "Parquet file import",
                    "3D visualization",
                  ],
                },
                {
                  name: "Team",
                  price: "$29/mo",
                  desc: "For teams connecting their workflows",
                  features: [
                    "Up to 50,000 nodes",
                    "Slack + Jira integration",
                    "AI-powered search",
                    "Shared workspaces",
                    "Priority support",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "For organizations at scale",
                  features: [
                    "Unlimited nodes",
                    "All integrations",
                    "SSO & SAML",
                    "Dedicated support",
                    "On-premise option",
                    "Custom SLA",
                  ],
                },
              ].map((tier, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 4,
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor:
                      i === 1 ? alpha("#ffffff", 0.15) : alpha("#ffffff", 0.06),
                    bgcolor:
                      i === 1 ? alpha("#ffffff", 0.03) : "transparent",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#a1a1aa", mb: 1 }}
                  >
                    {tier.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "#fafafa",
                      mb: 0.5,
                    }}
                  >
                    {tier.price}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.85rem", color: "#71717a", mb: 3 }}
                  >
                    {tier.desc}
                  </Typography>
                  {tier.features.map((f, j) => (
                    <Typography
                      key={j}
                      sx={{
                        fontSize: "0.85rem",
                        color: "#a1a1aa",
                        py: 0.5,
                        borderTop: j === 0 ? "1px solid" : "none",
                        borderColor: alpha("#ffffff", 0.06),
                        "&::before": { content: '"→ "', color: "#52525b" },
                      }}
                    >
                      {f}
                    </Typography>
                  ))}
                  <Button
                    variant={i === 1 ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => navigate("/demo")}
                    sx={{
                      mt: 3,
                      ...(i === 1
                        ? {
                            bgcolor: "#fafafa",
                            color: "#09090b",
                            "&:hover": { bgcolor: "#e4e4e7" },
                          }
                        : {
                            borderColor: alpha("#ffffff", 0.15),
                            color: "#fafafa",
                            "&:hover": {
                              borderColor: alpha("#ffffff", 0.3),
                              bgcolor: alpha("#ffffff", 0.04),
                            },
                          }),
                    }}
                  >
                    {i === 2 ? "Contact Sales" : "Get Started"}
                  </Button>
                </Box>
              ))}
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
