# Vinculum

A connected knowledge graph that unifies scattered company data from Slack, Jira, and Notion into a single, queryable 3D visualization.

## Overview

Vinculum automatically ingests data from your communication platforms and connects the pieces together. Conversations, tickets, and documents are linked into an interactive 3D star map, making company knowledge searchable and visual.

## Features

- **3D Knowledge Graph**: Interactive force-directed graph visualization (2D/3D)
- **AI-Powered Search**: Ask natural language questions and get answers with source citations
- **Multi-Source Ingestion**: Webhooks for Slack, Jira, and Notion data
- **Graph RAG Pipeline**: Hybrid semantic + graph traversal retrieval

## Quick Start

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd backend
docker-compose up -d
pip install -r requirements.txt
cp .env.example .env
python -m app.main
```

See `backend/README.md` for detailed setup instructions.

## Tech Stack

- **Frontend**: React 18, TypeScript, react-force-graph-3d, Material-UI
- **Backend**: FastAPI, Neo4j, Qdrant, OpenAI
- **Infrastructure**: Docker, GitHub Actions
