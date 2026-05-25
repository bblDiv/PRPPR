import { useState } from "react";
import { Entity } from "../models/entity";
import { Relationship } from "../models/relationship";
import { Document } from "../models/document";
import { TextUnit } from "../models/text-unit";
import { Community } from "../models/community";
import { CommunityReport } from "../models/community-report";
import { Covariate } from "../models/covariate";
import { readParquetFile } from "../utils/parquet-utils";

const baseFileNames = [
  "entities.parquet",
  "relationships.parquet",
  "documents.parquet",
  "text_units.parquet",
  "communities.parquet",
  "community_reports.parquet",
  "covariates.parquet",
];

const baseMapping: { [key: string]: string } = {
  "entities.parquet": "entity",
  "relationships.parquet": "relationship",
  "documents.parquet": "document",
  "text_units.parquet": "text_unit",
  "communities.parquet": "community",
  "community_reports.parquet": "community_report",
  "covariates.parquet": "covariate",
};

const fileSchemas: { [key: string]: string } = {};
Object.entries(baseMapping).forEach(([key, value]) => {
  fileSchemas[key] = value;
  fileSchemas[`create_final_${key}`] = value;
});

const inferSchema = (fileName: string): string | undefined => {
  const lower = fileName.toLowerCase();
  if (fileSchemas[fileName]) return fileSchemas[fileName];
  if (fileSchemas[`create_final_${fileName}`]) return fileSchemas[`create_final_${fileName}`];
  if (lower.includes("entit")) return "entity";
  if (lower.includes("relationship") || lower.includes("rel")) return "relationship";
  if (lower.includes("community_report")) return "community_report";
  if (lower.includes("communit")) return "community";
  if (lower.includes("document") || lower.includes("doc")) return "document";
  if (lower.includes("text_unit") || lower.includes("chunk")) return "text_unit";
  if (lower.includes("covariate")) return "covariate";
  return undefined;
};

const useFileHandler = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [textunits, setTextUnits] = useState<TextUnit[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [covariates, setCovariates] = useState<Covariate[]>([]);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(
    []
  );

  const handleFilesRead = async (files: File[]) => {
    await loadFiles(files);
  };

  const loadFiles = async (files: File[] | string[]) => {
    if (!Array.isArray(files)) {
      throw new TypeError("loadFiles: argument 'files' must be an array");
    }

    const entitiesArray: Entity[][] = [];
    const relationshipsArray: Relationship[][] = [];
    const documentsArray: Document[][] = [];
    const textUnitsArray: TextUnit[][] = [];
    const communitiesArray: Community[][] = [];
    const communityReportsArray: CommunityReport[][] = [];
    const covariatesArray: Covariate[][] = [];

    // Max file size: 50MB (50 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    for (const file of files) {
      if (typeof file !== "string" && !((file as any) instanceof File) && !((file as any) instanceof Blob)) {
        console.error("loadFiles: invalid element type. Skipping file:", file);
        continue;
      }

      const fileName =
        typeof file === "string" ? file.split("/").pop()! : file.name;      
      
      // Type Check: Verify .parquet extension
      if (!fileName.toLowerCase().endsWith(".parquet")) {
        console.warn(`loadFiles: Skipping non-parquet file: ${fileName}`);
        continue;
      }

      // Rate Limit / Size Check: Enforce maximum file size
      if (typeof file !== "string" && file.size > MAX_FILE_SIZE) {
        console.error(`loadFiles: File ${fileName} exceeds 50MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB). Skipping to prevent tab freeze.`);
        continue;
      }

      const schema = inferSchema(fileName);

      let data;
      if (typeof file === "string") {
        // Fetch default file from public folder as binary data
        const response = await fetch(file);
        if (!response.ok) {
          console.error(`Failed to fetch file ${file}: ${response.statusText}`);
          continue;
        }

        // Convert ArrayBuffer to File object
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/x-parquet" });
        const fileBlob = new File([blob], fileName);

        // Use the File object in readParquetFile
        data = await readParquetFile(fileBlob, schema);
        // console.log(`Successfully loaded ${fileName} from public folder`);
      } else {
        // Handle drag-and-drop files directly
        data = await readParquetFile(file, schema);
        // console.log(`Successfully loaded ${file.name} from drag-and-drop`);
      }

      if (schema === "entity") {
        entitiesArray.push(data);
      } else if (schema === "relationship") {
        relationshipsArray.push(data);
      } else if (schema === "document") {
        documentsArray.push(data);
      } else if (schema === "text_unit") {
        textUnitsArray.push(data);
      } else if (schema === "community") {
        communitiesArray.push(data);
      } else if (schema === "community_report") {
        communityReportsArray.push(data);
      } else if (schema === "covariate") {
        covariatesArray.push(data);
      }
    }

    if (entitiesArray.length > 0) setEntities(entitiesArray.flat());
    if (relationshipsArray.length > 0) setRelationships(relationshipsArray.flat());
    if (documentsArray.length > 0) setDocuments(documentsArray.flat());
    if (textUnitsArray.length > 0) setTextUnits(textUnitsArray.flat());
    if (communitiesArray.length > 0) setCommunities(communitiesArray.flat());
    if (communityReportsArray.length > 0) setCommunityReports(communityReportsArray.flat());
    if (covariatesArray.length > 0) setCovariates(covariatesArray.flat());
  };

  const checkFileExists = async (filePath: string) => {
    try {
      const response = await fetch(filePath, {
        method: "HEAD",
        cache: "no-store",
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type") || "";

        if (
          contentType === "application/octet-stream" ||
          contentType.includes("parquet") ||
          contentType === "application/x-parquet" ||
          contentType === "binary/octet-stream" ||
          !contentType.includes("text/html")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        console.warn(
          `File does not exist: ${filePath} (status: ${response.status})`
        );
        return false;
      }
    } catch (error) {
      console.error(`Error checking file existence for ${filePath}`, error);
      return false;
    }
  };

  const loadDefaultFiles = async () => {
    const filesToLoad = [];

    for (const baseName of baseFileNames) {
      const prefixedPath = process.env.PUBLIC_URL + `/artifacts/create_final_${baseName}`;
      const unprefixedPath = process.env.PUBLIC_URL + `/artifacts/${baseName}`;
  
      if (await checkFileExists(prefixedPath)) {
        filesToLoad.push(prefixedPath);
      } else if (await checkFileExists(unprefixedPath)) {
        filesToLoad.push(unprefixedPath);
      }
    }
    
    if (filesToLoad.length > 0) {
      await loadFiles(filesToLoad);
    } else {
      console.log("No default files found in the public folder.");
    }
  };

  return {
    entities,
    relationships,
    documents,
    textunits,
    communities,
    covariates,
    communityReports,
    handleFilesRead,
    loadDefaultFiles,
  };
};

export default useFileHandler;
