# NexusGraph Backend - GraphRAG Pipeline Architecture

## Overview

NexusGraph transforms fragmented corporate communication platforms (Slack, Jira, Notion) into an interconnected, actionable organizational memory using a hybrid GraphRAG architecture.

## Architecture Components

```
[Slack/Jira/Notion Webhooks] → [FastAPI Router] → [LLM Graph Transformer]
                                                            ↓
                                    ┌───────────────────────┴───────────────────────┐
                                    ↓                                               ↓
                            [Neo4j Graph DB]                              [Qdrant Vector DB]
                            (Relationships/Nodes)                         (Semantic Embeddings)
                                    ↑                                               ↑
                                    └───────────────────┬───────────────────────────┘
                                                        ↓
                                              [Hybrid Query Engine]
                                                        ↓
                                           [JSON Graph Topology API]
```

## Technology Stack

- **Framework**: FastAPI (Python 3.11+)
- **Graph Database**: Neo4j 5.x
- **Vector Database**: Qdrant
- **LLM Integration**: LangChain + OpenAI/Anthropic
- **Embeddings**: OpenAI text-embedding-3-small (1536 dimensions)

## Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry point
│   ├── config.py                  # Configuration management
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── ingest.py         # Webhook ingestion endpoints
│   │   │   └── query.py          # Query and retrieval endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   ├── graph_transformer.py  # LLM entity extraction
│   │   ├── chunking.py           # Text chunking with overlap
│   │   ├── entity_resolver.py    # Entity normalization
│   │   └── hybrid_retrieval.py   # Multi-hop query engine
│   ├── db/
│   │   ├── __init__.py
│   │   ├── neo4j_client.py       # Neo4j connection and queries
│   │   └── qdrant_client.py      # Qdrant vector operations
│   ├── models/
│   │   ├── __init__.py
│   │   ├── ingestion.py          # Ingestion payload schemas
│   │   ├── graph.py              # Graph node/edge schemas
│   │   └── query.py              # Query request/response schemas
│   └── utils/
│       ├── __init__.py
│       ├── hashing.py            # SHA-256 ID generation
│       └── embeddings.py         # Embedding generation
├── tests/
│   ├── __init__.py
│   ├── test_ingestion.py
│   ├── test_retrieval.py
│   └── test_graph_transformer.py
├── requirements.txt
├── .env.example
└── README.md
```

## Installation

### Prerequisites

1. **Python 3.11+**
2. **Neo4j Database** (Docker recommended)
3. **Qdrant Vector Database** (Docker recommended)
4. **OpenAI API Key** (or Anthropic)

### Setup Steps

1. **Clone and navigate to backend directory**:
```bash
cd backend
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. **Start Neo4j (Docker)**:
```bash
docker run -d \
  --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  neo4j:5.15
```

6. **Start Qdrant (Docker)**:
```bash
docker run -d \
  --name qdrant \
  -p 6333:6333 \
  qdrant/qdrant
```

7. **Run the application**:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Ingestion

**POST** `/api/v1/ingest`
- Accepts webhook payloads from Slack, Jira, Notion
- Extracts entities and relationships
- Stores in Neo4j + Qdrant

### Query

**POST** `/api/v1/query`
- Hybrid retrieval (semantic + graph traversal)
- Returns answer with citations and visualization data

**GET** `/api/v1/status`
- Health check endpoint

## Data Models

### Neo4j Node Labels
- `Person`: Corporate identities/users
- `Document`: Static repository items
- `Issue`: Transactional tracking (Jira tickets)
- `Concept`: Abstract software components

### Neo4j Relationships
- `AUTHORED`: Person → Document/Issue
- `DISCUSSED`: Person → Concept
- `RESOLVES`: Issue → Concept
- `DEPENDS_ON`: Issue → Issue
- `MENTIONS`: Document → Concept/Person

### Qdrant Collections
- Collection: `nexusgraph_entities`
- Vector dimension: 1536
- Distance metric: Cosine

## Configuration

Key environment variables in `.env`:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

# Qdrant Configuration
QDRANT_HOST=localhost
QDRANT_PORT=6333

# LLM Configuration
OPENAI_API_KEY=your_openai_key
EMBEDDING_MODEL=text-embedding-3-small
LLM_MODEL=gpt-4o

# Processing Configuration
CHUNK_SIZE=250
CHUNK_OVERLAP=25
SIMILARITY_THRESHOLD=0.65
```

## Development

### Running Tests
```bash
pytest tests/ -v
```

### Code Formatting
```bash
black app/
isort app/
```

### Type Checking
```bash
mypy app/
```

## Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Production Considerations
- Use managed Neo4j (Neo4j Aura)
- Use managed Qdrant (Qdrant Cloud)
- Implement rate limiting
- Add authentication/authorization
- Enable CORS for frontend integration
- Set up monitoring and logging

## Integration with Frontend

The backend API is designed to integrate seamlessly with the existing GraphRAG Visualizer frontend:

1. Update `REACT_APP_API_URL` in frontend `.env` to point to backend
2. Backend returns graph data in format compatible with `3d-force-graph`
3. Existing search components can use new `/api/v1/query` endpoint

## License

MIT License - See LICENSE file for details