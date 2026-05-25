import React from "react";
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "./DataTable";
import {
  CustomLink,
  CustomNode,
  customLinkColumns,
  customNodeColumns,
} from "../models/custom-graph-data";
import { textUnitColumns } from "../models/text-unit";
import { communityColumns } from "../models/community";
import {
  communityReportColumns,
  findingColumns,
} from "../models/community-report";
import { documentColumns } from "../models/document";
import { covariateColumns } from "../models/covariate";
import { MRT_ColumnDef } from "material-react-table";
import { entityColumns } from "../models/entity";

interface DetailDrawerProps {
  bottomDrawerOpen: boolean;
  setBottomDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNode: CustomNode | null;
  selectedRelationship: CustomLink | null;
  linkedNodes: CustomNode[];
  linkedRelationships: CustomLink[];
}

// Structured label-value row component for data formatting
const MetaRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderBottom: `1px solid ${alpha("#38bdf8", 0.08)}`,
        py: 1.5,
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 0.5, sm: 2 },
      }}
    >
      <Typography
        sx={{
          width: { xs: "100%", sm: 160 },
          fontSize: "0.68rem",
          fontWeight: 800,
          color: alpha("#38bdf8", 0.8),
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>
        {typeof value === "string" || typeof value === "number" ? (
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: "#f8fafc",
              wordBreak: "break-all",
              fontWeight: 500,
            }}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
};

// Premium formatting container for long text fields (e.g. summaries, descriptions)
const LongTextCard: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  if (!text) return null;
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "10px",
        bgcolor: alpha("#172416", 0.4),
        borderLeft: `4px solid #38bdf8`,
        borderTop: `1px solid ${alpha("#38bdf8", 0.1)}`,
        borderBottom: `1px solid ${alpha("#38bdf8", 0.1)}`,
        borderRight: `1px solid ${alpha("#38bdf8", 0.1)}`,
        boxShadow: `0 4px 12px ${alpha("#000000", 0.15)}`,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 800,
          color: "#38bdf8",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          mb: 1.2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.82rem",
          color: "#d4d4d8",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const DetailDrawer: React.FC<DetailDrawerProps> = ({
  bottomDrawerOpen,
  setBottomDrawerOpen,
  selectedNode,
  selectedRelationship,
  linkedNodes,
  linkedRelationships,
}) => {
  const getNodeName = (node: string | CustomNode) => {
    return typeof node === "object" ? node.name : node;
  };

  const getFilteredNodeColumns = (
    types: string[]
  ): MRT_ColumnDef<CustomNode>[] => {
    const validAccessorKeys = new Set<string>();
    if (types.includes("CHUNK")) {
      textUnitColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
    }

    if (types.includes("COMMUNITY")) {
      communityColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
      communityReportColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
    }

    if (types.includes("RAW_DOCUMENT")) {
      documentColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
    }

    if (types.includes("COVARIATE")) {
      covariateColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
    }

    if (types.includes("FINDING")) {
      findingColumns.forEach((tc) => {
        if (tc.accessorKey) {
          validAccessorKeys.add(tc.accessorKey);
        }
      });
    }

    entityColumns.forEach((tc) => {
      if (tc.accessorKey) {
        validAccessorKeys.add(tc.accessorKey);
      }
    });

    validAccessorKeys.add("uuid");
    return customNodeColumns.filter(
      (column) =>
        column.accessorKey && validAccessorKeys.has(column.accessorKey)
    );
  };

  const linkedNodeTypes = [...new Set(linkedNodes.map((node) => node.type))];
  const filteredColumns = getFilteredNodeColumns(linkedNodeTypes);

  return (
    <Drawer
      anchor="bottom"
      open={bottomDrawerOpen}
      onClose={() => setBottomDrawerOpen(false)}
      sx={{ zIndex: 1500 }}
      PaperProps={{
        sx: {
          bgcolor: alpha("#0f150e", 0.9),
          backgroundImage: "none",
          backdropFilter: "blur(20px)",
          borderTop: `2px solid ${alpha("#38bdf8", 0.35)}`,
          maxHeight: "82vh",
          boxShadow: `0 -8px 36px ${alpha("#000000", 0.55)}`,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 4,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: alpha("#38bdf8", 0.15),
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: alpha("#38bdf8", 0.35),
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
            borderBottom: `1px solid ${alpha("#38bdf8", 0.15)}`,
            pb: 2,
          }}
        >
          {selectedNode ? (
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#fafafa", letterSpacing: "-0.01em" }}>
              Node Details: <span style={{ color: "#38bdf8" }}>{selectedNode.name.toString()}</span>
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fafafa" }}>
              {selectedRelationship && (
                <>
                  <Box component="span" sx={{ color: alpha("#fafafa", 0.65) }}>Relationship:</Box>{" "}
                  {getNodeName(selectedRelationship.source)}{" "}
                  <Box component="span" sx={{ color: "#38bdf8", fontSize: "0.85em", mx: 1 }}>
                    {"-["}
                    {selectedRelationship.type}
                    {"]->"}
                  </Box>{" "}
                  {getNodeName(selectedRelationship.target)}
                </>
              )}
            </Typography>
          )}
          <IconButton
            onClick={() => setBottomDrawerOpen(false)}
            sx={{
              color: "#a1a1aa",
              border: `1px solid ${alpha("#38bdf8", 0.15)}`,
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
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Node Information Details Block */}
        {selectedNode && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 4 }}>
            <MetaRow label="UUID / Identifier" value={selectedNode.uuid} />
            <MetaRow label="Label Name" value={selectedNode.name} />
            <MetaRow 
              label="Node Type" 
              value={
                <Chip 
                  label={selectedNode.type} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha("#38bdf8", 0.1), 
                    color: "#38bdf8", 
                    border: `1px solid ${alpha("#38bdf8", 0.2)}`,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.05em"
                  }} 
                />
              } 
            />
            {selectedNode.covariate_type && (
              <MetaRow label="Covariate Type" value={selectedNode.covariate_type} />
            )}
            {selectedNode.title && (
              <MetaRow label="Community Report" value={selectedNode.title} />
            )}
            {selectedNode.human_readable_id !== undefined && (
              <MetaRow label="Human Readable ID" value={selectedNode.human_readable_id} />
            )}
            {selectedNode.n_tokens && (
              <MetaRow label="Token Count" value={selectedNode.n_tokens} />
            )}

            {/* Long formatted text descriptions */}
            {selectedNode.summary && (
              <LongTextCard title="Community Summary" text={selectedNode.summary} />
            )}
            {selectedNode.description && (
              <LongTextCard title="Description" text={selectedNode.description} />
            )}
            {selectedNode.raw_content && (
              <LongTextCard title="Raw Content Source" text={selectedNode.raw_content} />
            )}
          </Box>
        )}

        {/* Relationship Information Details Block */}
        {selectedRelationship && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 4 }}>
            <MetaRow label="Relationship ID" value={selectedRelationship.id} />
            <MetaRow label="Source Entity" value={getNodeName(selectedRelationship.source)} />
            <MetaRow label="Target Entity" value={getNodeName(selectedRelationship.target)} />
            <MetaRow 
              label="Link Type" 
              value={
                <Chip 
                  label={selectedRelationship.type} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha("#38bdf8", 0.1), 
                    color: "#38bdf8", 
                    border: `1px solid ${alpha("#38bdf8", 0.25)}`,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.05em"
                  }} 
                />
              } 
            />
            {selectedRelationship.human_readable_id !== undefined && (
              <MetaRow label="Human Readable ID" value={selectedRelationship.human_readable_id} />
            )}
            {selectedRelationship.weight && (
              <MetaRow label="Edge Weight" value={selectedRelationship.weight} />
            )}
            {selectedRelationship.source_degree !== undefined && (
              <MetaRow label="Source Node Degree" value={selectedRelationship.source_degree} />
            )}
            {selectedRelationship.target_degree !== undefined && (
              <MetaRow label="Target Node Degree" value={selectedRelationship.target_degree} />
            )}
            {selectedRelationship.rank !== undefined && (
              <MetaRow label="Rank Score" value={selectedRelationship.rank} />
            )}

            {/* Long formatted relationship description */}
            {selectedRelationship.description && (
              <LongTextCard title="Relationship Description" text={selectedRelationship.description} />
            )}
          </Box>
        )}

        {/* Linked Data Tables */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 800, 
                color: "#fafafa", 
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#38bdf8" }} />
              Linked Neighboring Nodes
            </Typography>
            <DataTable columns={filteredColumns} data={linkedNodes} />
          </Box>

          {selectedNode && (
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 800, 
                  color: "#fafafa", 
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#38bdf8" }} />
                Linked Neighboring Relationships
              </Typography>
              <DataTable
                columns={customLinkColumns}
                data={linkedRelationships.map((link) => ({
                  ...link,
                  source: getNodeName(link.source),
                  target: getNodeName(link.target),
                }))}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailDrawer;
