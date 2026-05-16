# NexusGraph Implementation Guide

This guide provides step-by-step instructions for completing the NexusGraph backend implementation based on the PRD specifications.

## Current Status

✅ **Completed:**
- Backend directory structure
- Configuration management
- Data models (Pydantic schemas)
- Utility functions (hashing, embeddings)
- Core business logic (chunking, entity resolution, graph transformer)
- API endpoints (ingestion, query)
- Docker setup
- Documentation

⚠️ **Pending Implementation:**
- Database client implementations (Neo4j, Qdrant)
- Hybrid retrieval engine
- Complete LLM integration
- Testing suite

---

## Phase 1: Database Clients

### 1.1 Neo4j Client Implementation

Create `backend/app/db/neo4j_client.py`:

```python
"""
Neo4j database client for graph operations.
"""

from typing import List, Dict, Optional
from neo4j import AsyncGraphDatabase
from ..config import settings

class Neo4jClient:
    def __init__(self):
        self.driver = None
    
    async def connect(self):
        """Initialize Neo4j connection."""
        self.driver = AsyncGraphDatabase.driver(
            settings.neo4j_uri,
            auth=(settings.neo4j_user, settings.neo4j_password)
        )
    
    async def close(self):
        """Close Neo4j connection."""
        if self.driver:
            await self.driver.close()
    
    async def create_node(self, label: str, properties: Dict) -> str:
        """Create a node in Neo4j."""
        # Implementation here
        pass
    
    async def create_relationship(self, source_id: str, target_id: str, 
                                  rel_type: str, properties: Dict = None):
        """Create a relationship between nodes."""
        # Implementation here
        pass
    
    async def get_subgraph(self, seed_ids: List[str], max_hops: int = 2):
        """Get subgraph around seed nodes."""
        # Implementation here
        pass

# Global client instance
neo4j_client = Neo4jClient()
```

**Key Cypher Queries to Implement:**

1. **Create Node with Merge:**
```cypher
MERGE (n:Person {id: $id})
SET n += $properties
RETURN n
```

2. **Multi-Hop Traversal:**
```cypher
MATCH (e:Entity) WHERE e.id IN $seed_ids
MATCH path = (e)-[r:AUTHORED|MENTIONS|RESOLVES|DEPENDS_ON*1..2]-(target)
RETURN path, target.id, type(r) LIMIT 50
```

3. **Create Relationship:**
```cypher
MATCH (a {id: $source_id})
MATCH (b {id: $target_id})
MERGE (a)-[r:RELATIONSHIP_TYPE]->(b)
SET r += $properties
RETURN r
```

### 1.2 Qdrant Client Implementation

Create `backend/app/db/qdrant_client.py`:

```python
"""
Qdrant vector database client.
"""

from typing import List, Dict
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from ..config import settings

class QdrantClient:
    def __init__(self):
        self.client = None
    
    async def connect(self):
        """Initialize Qdrant connection."""
        self.client = AsyncQdrantClient(
            host=settings.qdrant_host,
            port=settings.qdrant_port
        )
        await self.ensure_collection()
    
    async def ensure_collection(self):
        """Create collection if it doesn't exist."""
        collections = await self.client.get_collections()
        if settings.qdrant_collection not in [c.name for c in collections.collections]:
            await self.client.create_collection(
                collection_name=settings.qdrant_collection,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
            )
    
    async def upsert_point(self, entity_id: str, vector: List[float], 
                          payload: Dict):
        """Insert or update a vector point."""
        # Implementation here
        pass
    
    async def search(self, query_vector: List[float], limit: int = 5):
        """Search for similar vectors."""
        # Implementation here
        pass

# Global client instance
qdrant_client = QdrantClient()
```

---

## Phase 2: Hybrid Retrieval Engine

Create `backend/app/core/hybrid_retrieval.py`:

```python
"""
Hybrid retrieval combining semantic search and graph traversal.
"""

from typing import List, Dict, Tuple
from ..db.neo4j_client import neo4j_client
from ..db.qdrant_client import qdrant_client
from ..utils.embeddings import generate_query_embedding
from ..config import settings

async def hybrid_search(query: str) -> Tuple[str, List[Dict], Dict]:
    """
    Execute hybrid search combining Qdrant and Neo4j.
    
    Returns:
        Tuple of (answer, citations, visualization_data)
    """
    # Step 1: Generate query embedding
    query_embedding = await generate_query_embedding(query)
    
    # Step 2: Search Qdrant for similar entities
    similar_entities = await qdrant_client.search(
        query_vector=query_embedding,
        limit=settings.top_k_results
    )
    
    # Step 3: Extract seed IDs
    seed_ids = [entity.payload["entity_id"] for entity in similar_entities]
    
    # Step 4: Get subgraph from Neo4j
    subgraph = await neo4j_client.get_subgraph(
        seed_ids=seed_ids,
        max_hops=settings.max_hops
    )
    
    # Step 5: Build context
    context = build_context(similar_entities, subgraph)
    
    # Step 6: Generate answer with LLM
    answer = await generate_answer(query, context)
    
    # Step 7: Extract citations
    citations = extract_citations(similar_entities, subgraph)
    
    # Step 8: Build visualization
    visualization = build_visualization(subgraph)
    
    return answer, citations, visualization
```

---

## Phase 3: Integration Steps

### 3.1 Update `app/main.py` Lifespan

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting NexusGraph backend...")
    await neo4j_client.connect()
    await qdrant_client.connect()
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await neo4j_client.close()
    await qdrant_client.close()
```

### 3.2 Update Ingestion Endpoint

In `app/api/v1/ingest.py`, replace TODO comments with:

```python
# Store entities in Neo4j and Qdrant
for entity in entities:
    entity_id = generate_entity_id(entity["name"], entity["type"])
    
    # Create node in Neo4j
    await neo4j_client.create_node(
        label=entity["type"],
        properties={
            "id": entity_id,
            "name": entity["name"],
            "description": entity["description"]
        }
    )
    
    # Generate embedding and store in Qdrant
    embedding = await generate_embedding(entity["description"])
    await qdrant_client.upsert_point(
        entity_id=entity_id,
        vector=embedding,
        payload={
            "entity_id": entity_id,
            "entity_type": entity["type"],
            "raw_text_content": entity["description"]
        }
    )
    
    nodes_added += 1

# Store relationships
for rel in relationships:
    await neo4j_client.create_relationship(
        source_id=rel["source"],
        target_id=rel["target"],
        rel_type=rel["type"],
        properties={"description": rel["description"]}
    )
    edges_connected += 1
```

### 3.3 Update Query Endpoint

In `app/api/v1/query.py`, replace placeholder with:

```python
from ...core.hybrid_retrieval import hybrid_search

# Inside query_knowledge_graph function:
answer, citations, visualization = await hybrid_search(request.query)

return QueryResponse(
    answer=answer,
    citations=citations,
    visualization=visualization if request.include_visualization else None,
    confidence_score=0.85,
    processing_time_ms=processing_time
)
```

---

## Phase 4: Testing

### 4.1 Create Test Files

Create `backend/tests/test_ingestion.py`:

```python
import pytest
from app.models.ingestion import IngestionPayload, PayloadData

@pytest.mark.asyncio
async def test_ingest_slack_message():
    payload = IngestionPayload(
        source_system="slack",
        event_id="test-123",
        timestamp="2026-05-16T00:00:00Z",
        payload=PayloadData(
            author_id="U123",
            author_name="Test User",
            content_body="Test message",
            resource_id="msg_123",
            tags=[]
        )
    )
    # Test ingestion logic
    assert payload.source_system == "slack"
```

### 4.2 Run Tests

```bash
cd backend
pytest tests/ -v --cov=app
```

---

## Phase 5: Deployment

### 5.1 Local Development

```bash
# Start databases
cd backend
docker-compose up -d

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your API keys

# Run backend
python -m app.main
```

### 5.2 Production Deployment

```bash
# Build and run everything with Docker
docker-compose up -d --build

# Or deploy to cloud (AWS, GCP, Azure)
# Use managed Neo4j Aura and Qdrant Cloud
```

---

## Phase 6: Frontend Integration

### 6.1 Update Frontend Environment

In the root project, create `.env`:

```env
REACT_APP_API_URL=http://localhost:8000
```

### 6.2 Test Integration

1. Start backend: `cd backend && python -m app.main`
2. Start frontend: `npm start`
3. Use the search interface to query the API

---

## Next Steps Priority

1. ✅ Implement Neo4j client (`app/db/neo4j_client.py`)
2. ✅ Implement Qdrant client (`app/db/qdrant_client.py`)
3. ✅ Complete hybrid retrieval (`app/core/hybrid_retrieval.py`)
4. ✅ Update ingestion endpoint with database operations
5. ✅ Update query endpoint with hybrid search
6. ✅ Write tests
7. ✅ Deploy and test end-to-end

---

## Troubleshooting

### Common Issues

1. **Import errors**: Install dependencies with `pip install -r requirements.txt`
2. **Database connection**: Ensure Docker containers are running
3. **API key errors**: Set `OPENAI_API_KEY` in `.env`
4. **CORS errors**: Check `CORS_ORIGINS` in `.env`

### Debugging

Enable debug logging in `.env`:
```env
LOG_LEVEL=DEBUG
```

---

## Resources

- [Neo4j Python Driver](https://neo4j.com/docs/python-manual/current/)
- [Qdrant Python Client](https://qdrant.tech/documentation/quick-start/)
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)