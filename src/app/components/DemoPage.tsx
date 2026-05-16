import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#09090b" }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderBottom: "1px solid",
          borderColor: alpha("#ffffff", 0.06),
          bgcolor: "#09090b",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/")}
            sx={{ color: "#a1a1aa", "&:hover": { color: "#fafafa" } }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#fafafa" }}>
            Vinculum Demo
          </Typography>
          <Chip
            label="SAMPLE DATA"
            size="small"
            sx={{
              bgcolor: alpha("#f59e0b", 0.12),
              color: "#fbbf24",
              border: `1px solid ${alpha("#f59e0b", 0.25)}`,
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              height: 22,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={`${graphData.nodes.length} nodes`}
            size="small"
            sx={{
              bgcolor: alpha("#ffffff", 0.06),
              color: "#a1a1aa",
              fontSize: "0.7rem",
              height: 24,
            }}
          />
          <Chip
            label={`${graphData.links.length} edges`}
            size="small"
            sx={{
              bgcolor: alpha("#ffffff", 0.06),
              color: "#a1a1aa",
              fontSize: "0.7rem",
              height: 24,
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Panel */}
        <Box
          sx={{
            width: { xs: "100%", md: 320 },
            display: { xs: leftTab === 0 || leftTab === 1 ? "flex" : "none", md: "flex" },
            flexDirection: "column",
            borderRight: "1px solid",
            borderColor: alpha("#ffffff", 0.06),
            bgcolor: "#0c0c0e",
          }}
        >
          <Tabs
            value={leftTab}
            onChange={(_, v) => setLeftTab(v)}
            sx={{
              minHeight: 40,
              borderBottom: "1px solid",
              borderColor: alpha("#ffffff", 0.06),
              "& .MuiTab-root": {
                minHeight: 40,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#71717a",
                textTransform: "none",
                "&.Mui-selected": { color: "#fafafa" },
              },
              "& .MuiTabs-indicator": { bgcolor: "#fafafa" },
            }}
          >
            <Tab
              icon={<CloudUploadIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Ingest"
            />
            <Tab
              icon={<TableChartIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Data"
            />
          </Tabs>

          {leftTab === 0 && (
            <Box sx={{ p: 2, flex: 1, overflow: "auto" }}>
              {/* Drop Zone */}
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed",
                  borderColor: isDragActive ? "#fafafa" : alpha("#ffffff", 0.1),
                  borderRadius: "10px",
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: isDragActive ? alpha("#ffffff", 0.04) : alpha("#ffffff", 0.02),
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: alpha("#ffffff", 0.25),
                    bgcolor: alpha("#ffffff", 0.03),
                  },
                  mb: 3,
                }}
              >
                <input
                  {...getInputProps()}
                  {...({ webkitdirectory: "true" } as any)}
                />
                <CloudUploadIcon
                  sx={{ fontSize: 36, color: "#71717a", mb: 1 }}
                />
                <Typography sx={{ fontSize: "0.8rem", color: "#a1a1aa", mb: 0.5 }}>
                  {isDragActive
                    ? "Drop files here..."
                    : "Drop GraphRAG artifacts or click to upload"}
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "#52525b" }}>
                  Supports .parquet files
                </Typography>
              </Box>

              {/* Graph Layers */}
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  mb: 1.5,
                }}
              >
                Graph Layers
              </Typography>
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
                    px: 1.5,
                    py: 0.8,
                    mb: 0.5,
                    borderRadius: "8px",
                    cursor: layer.disabled ? "default" : "pointer",
                    opacity: layer.disabled ? 0.4 : 1,
                    bgcolor: layer.checked ? alpha("#ffffff", 0.06) : "transparent",
                    border: "1px solid",
                    borderColor: layer.checked ? alpha("#ffffff", 0.1) : "transparent",
                    transition: "all 0.15s",
                    "&:hover": layer.disabled
                      ? {}
                      : { bgcolor: alpha("#ffffff", 0.04) },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: layer.checked ? "#fafafa" : "#3f3f46",
                        transition: "all 0.15s",
                      }}
                    />
                    <Typography sx={{ fontSize: "0.8rem", color: "#d4d4d8" }}>
                      {layer.label}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.7rem", color: "#71717a" }}>
                    {layer.count}
                  </Typography>
                </Box>
              ))}

              {/* Stats */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: "10px",
                  bgcolor: alpha("#ffffff", 0.02),
                  border: "1px solid",
                  borderColor: alpha("#ffffff", 0.06),
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#71717a",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    mb: 1,
                  }}
                >
                  Loaded Artifacts
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
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
                        sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#fafafa" }}
                      >
                        {stat.count}
                      </Typography>
                      <Typography sx={{ fontSize: "0.65rem", color: "#71717a" }}>
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
                  minHeight: 32,
                  borderBottom: "1px solid",
                  borderColor: alpha("#ffffff", 0.06),
                  "& .MuiTab-root": {
                    minHeight: 32,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "#71717a",
                    textTransform: "none",
                    minWidth: "auto",
                    px: 1.5,
                    "&.Mui-selected": { color: "#d4d4d8" },
                  },
                  "& .MuiTabs-indicator": { bgcolor: "#fafafa", height: 2 },
                }}
              >
                {dataTableConfigs.map((cfg) => (
                  <Tab key={cfg.label} label={cfg.label} />
                ))}
              </Tabs>
              <Box sx={{ flex: 1, overflow: "auto", p: 0.5 }}>
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
            bgcolor: "#000000",
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
