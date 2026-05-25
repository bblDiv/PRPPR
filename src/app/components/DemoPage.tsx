import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Chip,
  IconButton,
  alpha,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TableChartIcon from "@mui/icons-material/TableChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useFileHandler from "../hooks/useFileHandler";
import useGraphData from "../hooks/useGraphData";
import GraphViewer from "./GraphViewer";
import DataTable from "./DataTable";
import StarryBackground from "./StarryBackground";
import { entityColumns } from "../models/entity";
import { relationshipColumns } from "../models/relationship";
import { documentColumns } from "../models/document";
import { textUnitColumns } from "../models/text-unit";
import { communityColumns } from "../models/community";
import { communityReportColumns } from "../models/community-report";
import { covariateColumns } from "../models/covariate";

const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState(0);
  const [dataTab, setDataTab] = useState(0);
  const [includeDocuments, setIncludeDocuments] = useState(false);
  const [includeTextUnits, setIncludeTextUnits] = useState(false);
  const [includeCommunities, setIncludeCommunities] = useState(false);
  const [includeCovariates, setIncludeCovariates] = useState(false);
  const [maxEntities, setMaxEntities] = useState(500);

  const {
    entities,
    relationships,
    documents,
    textunits,
    communities,
    covariates,
    communityReports,
    handleFilesRead,
    loadDefaultFiles,
  } = useFileHandler();

  const graphData = useGraphData(
    entities,
    relationships,
    documents,
    textunits,
    communities,
    communityReports,
    covariates,
    includeDocuments,
    includeTextUnits,
    includeCommunities,
    includeCovariates,
    maxEntities
  );

  const hasDocuments = documents.length > 0;
  const hasTextUnits = textunits.length > 0;
  const hasCommunities = communities.length > 0;
  const hasCovariates = covariates.length > 0;

  useEffect(() => {
    loadDefaultFiles();
    // eslint-disable-next-line
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFilesRead(acceptedFiles);
      setLeftTab(1);
    },
    [handleFilesRead]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    noKeyboard: true,
    accept: { "application/x-parquet": [".parquet"] },
  });

  const dataTableConfigs = [
    { label: "Entities", columns: entityColumns, data: entities },
    { label: "Relationships", columns: relationshipColumns, data: relationships },
    { label: "Documents", columns: documentColumns, data: documents },
    { label: "Text Units", columns: textUnitColumns, data: textunits },
    { label: "Communities", columns: communityColumns, data: communities },
    { label: "Reports", columns: communityReportColumns, data: communityReports },
    { label: "Covariates", columns: covariateColumns, data: covariates },
  ];

  const currentTableConfig = dataTableConfigs[dataTab];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0d120a",
        overflow: "hidden",
      }}
    >
      {/* Space Starry Background */}
      <StarryBackground />

      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: alpha("#38bdf8", 0.15),
          bgcolor: alpha("#0d120a", 0.5),
          backdropFilter: "blur(12px)",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              color: "#a1a1aa",
              border: `1px solid ${alpha("#38bdf8", 0.1)}`,
              borderRadius: "8px",
              bgcolor: alpha("#ffffff", 0.02),
              transition: "all 0.2s",
              "&:hover": {
                color: "#38bdf8",
                borderColor: "#38bdf8",
                bgcolor: alpha("#38bdf8", 0.05),
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fafafa", letterSpacing: "0.02em" }}>
            Vinculum Demo
          </Typography>
          <Chip
            label="SAMPLE DATA"
            size="small"
            sx={{
              bgcolor: alpha("#38bdf8", 0.08),
              color: "#38bdf8",
              border: `1px solid ${alpha("#38bdf8", 0.2)}`,
              fontWeight: 700,
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              height: 20,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip
            label={`${graphData.nodes.length} nodes`}
            size="small"
            sx={{
              bgcolor: alpha("#38bdf8", 0.05),
              color: "#a1a1aa",
              border: `1px solid ${alpha("#38bdf8", 0.1)}`,
              fontSize: "0.68rem",
              fontWeight: 600,
              height: 22,
            }}
          />
          <Chip
            label={`${graphData.links.length} edges`}
            size="small"
            sx={{
              bgcolor: alpha("#38bdf8", 0.05),
              color: "#a1a1aa",
              border: `1px solid ${alpha("#38bdf8", 0.1)}`,
              fontSize: "0.68rem",
              fontWeight: 600,
              height: 22,
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden", zIndex: 5 }}>
        {/* Left Panel */}
        <Box
          sx={{
            width: { xs: "100%", md: 340 },
            display: { xs: leftTab === 0 || leftTab === 1 ? "flex" : "none", md: "flex" },
            flexDirection: "column",
            borderRight: "1px solid",
            borderColor: alpha("#38bdf8", 0.15),
            bgcolor: alpha("#131a11", 0.72),
            backdropFilter: "blur(16px)",
            boxShadow: `10px 0 30px ${alpha("#000000", 0.3)}`,
          }}
        >
          <Tabs
            value={leftTab}
            onChange={(_, v) => setLeftTab(v)}
            sx={{
              minHeight: 48,
              borderBottom: "1px solid",
              borderColor: alpha("#38bdf8", 0.12),
              "& .MuiTab-root": {
                minHeight: 48,
                fontSize: "0.78rem",
                fontWeight: 700,
                color: alpha("#38bdf8", 0.45),
                textTransform: "none",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
                "&.Mui-selected": {
                  color: "#38bdf8",
                  bgcolor: alpha("#38bdf8", 0.03),
                },
                "&:hover": {
                  color: "#38bdf8",
                },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
                height: 3,
              },
            }}
          >
            <Tab
              icon={<CloudUploadIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Ingest Space"
            />
            <Tab
              icon={<TableChartIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Artifact Table"
            />
          </Tabs>

          {leftTab === 0 && (
            <Box sx={{ p: 2.5, flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 3.5 }}>
              {/* Drop Zone */}
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed",
                  borderColor: isDragActive ? "#38bdf8" : alpha("#38bdf8", 0.3),
                  borderRadius: "12px",
                  p: 3.5,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: isDragActive ? alpha("#38bdf8", 0.08) : alpha("#131a11", 0.4),
                  boxShadow: isDragActive ? `0 0 20px ${alpha("#38bdf8", 0.25)}` : "none",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    bgcolor: alpha("#38bdf8", 0.05),
                    boxShadow: `0 0 15px ${alpha("#38bdf8", 0.15)}`,
                    transform: "translateY(-1px)",
                    "& .upload-icon": {
                      color: "#38bdf8",
                      transform: "scale(1.15) translateY(-3px)",
                    },
                  },
                }}
              >
                <input
                  {...getInputProps()}
                  {...({ webkitdirectory: "true" } as any)}
                />
                <CloudUploadIcon
                  className="upload-icon"
                  sx={{
                    fontSize: 42,
                    color: isDragActive ? "#38bdf8" : alpha("#38bdf8", 0.5),
                    mb: 1.5,
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  }}
                />
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#fafafa", mb: 0.5 }}>
                  {isDragActive
                    ? "Release to upload..."
                    : "Drop GraphRAG directory or click"}
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: alpha("#38bdf8", 0.6) }}>
                  Supports parquet tables
                </Typography>
              </Box>

              {/* Graph Layers */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: alpha("#38bdf8", 0.7),
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    mb: 2,
                  }}
                >
                  Graph Explorer Layers
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    {
                      label: "Documents",
                      checked: includeDocuments,
                      onChange: () => setIncludeDocuments(!includeDocuments),
                      disabled: !hasDocuments,
                      count: documents.length,
                    },
                    {
                      label: "Text Units",
                      checked: includeTextUnits,
                      onChange: () => setIncludeTextUnits(!includeTextUnits),
                      disabled: !hasTextUnits,
                      count: textunits.length,
                    },
                    {
                      label: "Communities",
                      checked: includeCommunities,
                      onChange: () => setIncludeCommunities(!includeCommunities),
                      disabled: !hasCommunities,
                      count: communities.length,
                    },
                    {
                      label: "Covariates",
                      checked: includeCovariates,
                      onChange: () => setIncludeCovariates(!includeCovariates),
                      disabled: !hasCovariates,
                      count: covariates.length,
                    },
                  ].map((layer) => (
                    <Box
                      key={layer.label}
                      onClick={layer.disabled ? undefined : layer.onChange}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 1.2,
                        borderRadius: "10px",
                        cursor: layer.disabled ? "default" : "pointer",
                        opacity: layer.disabled ? 0.35 : 1,
                        bgcolor: layer.checked ? alpha("#38bdf8", 0.08) : alpha("#ffffff", 0.01),
                        border: "1px solid",
                        borderColor: layer.checked ? alpha("#38bdf8", 0.3) : alpha("#ffffff", 0.04),
                        transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        "&:hover": layer.disabled
                          ? {}
                          : {
                              bgcolor: alpha("#38bdf8", 0.04),
                              borderColor: alpha("#38bdf8", 0.25),
                              transform: "translateX(4px)",
                            },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: layer.checked ? "#38bdf8" : alpha("#ffffff", 0.2),
                            boxShadow: layer.checked ? "0 0 8px #38bdf8" : "none",
                            transition: "all 0.2s",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.82rem",
                            fontWeight: layer.checked ? 600 : 500,
                            color: layer.checked ? "#fafafa" : "#a1a1aa",
                            transition: "all 0.2s",
                          }}
                        >
                          {layer.label}
                        </Typography>
                      </Box>
                      <Chip
                        label={layer.count}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          bgcolor: layer.checked ? alpha("#38bdf8", 0.15) : alpha("#ffffff", 0.03),
                          color: layer.checked ? "#38bdf8" : "#71717a",
                          border: `1px solid ${layer.checked ? alpha("#38bdf8", 0.25) : "transparent"}`,
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  mt: "auto",
                  p: 2.2,
                  borderRadius: "12px",
                  bgcolor: alpha("#131a11", 0.45),
                  border: "1px solid",
                  borderColor: alpha("#38bdf8", 0.15),
                  boxShadow: `inset 0 0 10px ${alpha("#000000", 0.25)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: alpha("#38bdf8", 0.7),
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    mb: 2,
                  }}
                >
                  Cosmic Stats Dashboard
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  {[
                    { label: "Entities", count: entities.length },
                    { label: "Relations", count: relationships.length },
                    { label: "Documents", count: documents.length },
                    { label: "Text Units", count: textunits.length },
                    { label: "Communities", count: communities.length },
                    { label: "Reports", count: communityReports.length },
                  ].map((stat) => (
                    <Box key={stat.label}>
                      <Typography
                        sx={{
                          fontSize: "1.15rem",
                          fontWeight: 800,
                          color: "#38bdf8",
                          letterSpacing: "-0.01em",
                          textShadow: `0 0 8px ${alpha("#38bdf8", 0.4)}`,
                        }}
                      >
                        {stat.count}
                      </Typography>
                      <Typography sx={{ fontSize: "0.65rem", color: "#a1a1aa", fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {leftTab === 1 && (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <Tabs
                value={dataTab}
                onChange={(_, v) => setDataTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: 36,
                  borderBottom: "1px solid",
                  borderColor: alpha("#38bdf8", 0.12),
                  "& .MuiTab-root": {
                    minHeight: 36,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: alpha("#38bdf8", 0.45),
                    textTransform: "none",
                    minWidth: "auto",
                    px: 2,
                    "&.Mui-selected": {
                      color: "#38bdf8",
                      bgcolor: alpha("#38bdf8", 0.04),
                    },
                  },
                  "& .MuiTabs-indicator": {
                    bgcolor: "#38bdf8",
                    height: 2,
                  },
                }}
              >
                {dataTableConfigs.map((cfg) => (
                  <Tab key={cfg.label} label={cfg.label} />
                ))}
              </Tabs>
              <Box sx={{ flex: 1, overflow: "auto", p: 1.5 }}>
                <DataTable
                  columns={currentTableConfig.columns as any}
                  data={currentTableConfig.data as any}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* Right Panel - Graph */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            bgcolor: "transparent",
          }}
        >
          <GraphViewer
            data={graphData}
            graphType="3d"
            isFullscreen={false}
            onToggleFullscreen={() => {}}
            onToggleGraphType={() => {}}
            includeDocuments={includeDocuments}
            onIncludeDocumentsChange={setIncludeDocuments}
            includeTextUnits={includeTextUnits}
            onIncludeTextUnitsChange={setIncludeTextUnits}
            includeCommunities={includeCommunities}
            onIncludeCommunitiesChange={setIncludeCommunities}
            includeCovariates={includeCovariates}
            onIncludeCovariatesChange={setIncludeCovariates}
            hasDocuments={hasDocuments}
            hasTextUnits={hasTextUnits}
            hasCommunities={hasCommunities}
            hasCovariates={hasCovariates}
            maxEntities={maxEntities}
            onMaxEntitiesChange={setMaxEntities}
            totalEntities={entities.length}
            embedded
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DemoPage;
