import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { Box, alpha } from "@mui/material";

interface DataTableProps<T extends object> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
}

const DataTable = <T extends object>({
  data,
  columns,
}: DataTableProps<T>): React.ReactElement => {
  const table = useMaterialReactTable<T>({
    data,
    columns,
    initialState: {
      columnVisibility: {
        graph_embedding: false,
        description_embedding: false,
      },
      density: "compact",
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    // Visual customization for the premium dark space vibe
    muiTablePaperProps: {
      sx: {
        background: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 240px)",
        border: `1px solid ${alpha("#38bdf8", 0.12)}`,
        borderRadius: "10px",
        backgroundColor: alpha("#131a11", 0.65),
        backdropFilter: "blur(8px)",
        boxShadow: `0 8px 32px 0 ${alpha("#000000", 0.37)}`,
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: alpha("#38bdf8", 0.15),
          borderRadius: "4px",
          border: `2px solid ${alpha("#131a11", 0.65)}`,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: alpha("#38bdf8", 0.35),
        },
      },
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: alpha("#1d251a", 0.85),
        borderBottom: `2px solid ${alpha("#38bdf8", 0.25)}`,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: "#38bdf8",
        fontWeight: 700,
        fontSize: "0.72rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        py: 1.2,
        borderBottom: `1px solid ${alpha("#38bdf8", 0.12)}`,
        "& .Mui-TableHeadCell-Content-Labels": {
          color: "#38bdf8",
        },
        "& .Mui-TableHeadCell-Content-Actions": {
          color: "#38bdf8",
        },
      },
    },
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: `${alpha("#38bdf8", 0.08)} !important`,
        },
        transition: "background-color 0.2s",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        color: "#d4d4d8",
        fontSize: "0.72rem",
        py: 1,
        borderBottom: `1px solid ${alpha("#ffffff", 0.04)}`,
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: "transparent",
        color: "#a1a1aa",
        borderTop: `1px solid ${alpha("#38bdf8", 0.1)}`,
        "& .MuiTablePagination-root": {
          color: "#a1a1aa",
          fontSize: "0.7rem",
        },
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
          fontSize: "0.7rem",
        },
        "& .MuiTablePagination-select": {
          fontSize: "0.7rem",
        },
        "& .MuiIconButton-root": {
          color: "#38bdf8",
          padding: "6px",
          "&.Mui-disabled": {
            color: alpha("#38bdf8", 0.25),
          },
        },
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "transparent",
        borderBottom: `1px solid ${alpha("#38bdf8", 0.1)}`,
        minHeight: "44px !important",
        "& .MuiInputBase-root": {
          color: "#fafafa",
          fontSize: "0.75rem",
          height: "30px",
          border: `1px solid ${alpha("#38bdf8", 0.15)}`,
          borderRadius: "6px",
          bgcolor: alpha("#000000", 0.25),
          px: 1,
          mb: 1,
          "&:after, &:before": {
            display: "none",
          },
        },
        "& .MuiIconButton-root": {
          color: "#38bdf8",
          padding: "6px",
        },
      },
    },
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    enableColumnActions: false,
    enableHiding: false,
    enableFilters: false,
    enableSorting: true,
  });

  return (
    <Box sx={{ zIndex: 1500, p: 0.5 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DataTable;
