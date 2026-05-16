"""
Query API endpoints for hybrid GraphRAG retrieval.
Implements semantic search + graph traversal.
DEMO MODE: Works without API keys using mock data.
"""

from fastapi import APIRouter, HTTPException, status
import logging
import time

from ...models.query import QueryRequest, QueryResponse, Citation, StatusResponse
from ...models.graph import GraphVisualization, GraphNode, GraphEdge
from ...config import settings
from ... import __version__

logger = logging.getLogger(__name__)

router = APIRouter()


def generate_demo_response(query: str) -> QueryResponse:
    """
    Generate a demo response with realistic mock data.
    This allows the API to work without database or LLM connections.
    """
    # Sample entities based on common queries
    demo_entities = {
        "auth": {
            "nodes": [
                GraphNode(id="sarah_jenkins", label="Sarah Jenkins", group="Person", val=30),
                GraphNode(id="eng_102", label="ENG-102: Auth Timeout", group="Issue", val=40),
                GraphNode(id="auth_service", label="Authentication Service", group="Concept", val=35),
                GraphNode(id="oauth_doc", label="OAuth2 Migration Guide", group="Document", val=25),
            ],
            "links": [
                GraphEdge(source="sarah_jenkins", target="eng_102", type="AUTHORED", weight=1.0),
                GraphEdge(source="eng_102", target="auth_service", type="RESOLVES", weight=0.9),
                GraphEdge(source="oauth_doc", target="auth_service", type="MENTIONS", weight=0.8),
            ],
            "answer": "The legacy authentication protocol was deprecated due to timeout issues reported by Sarah Jenkins in ticket ENG-102. The team migrated to OAuth2, with documentation updated in the OAuth2 Migration Guide.",
            "citations": [
                Citation(
                    source="slack",
                    id="msg_9982",
                    url="https://slack.com/archives/C123/p1234567890",
                    excerpt="Experiencing 4 timeout errors with legacy auth protocol"
                ),
                Citation(
                    source="jira",
                    id="ENG-102",
                    url="https://jira.company.com/browse/ENG-102",
                    excerpt="Critical: Authentication timeout failures in production"
                ),
                Citation(
                    source="notion",
                    id="oauth-guide",
                    url="https://notion.so/oauth2-migration",
                    excerpt="OAuth2 Migration Guide - Updated last Tuesday"
                ),
            ]
        },
        "default": {
            "nodes": [
                GraphNode(id="demo_person", label="Demo User", group="Person", val=20),
                GraphNode(id="demo_concept", label="Sample Concept", group="Concept", val=25),
                GraphNode(id="demo_doc", label="Documentation", group="Document", val=20),
            ],
            "links": [
                GraphEdge(source="demo_person", target="demo_concept", type="DISCUSSED", weight=0.8),
                GraphEdge(source="demo_doc", target="demo_concept", type="MENTIONS", weight=0.7),
            ],
            "answer": "This is a demo response. The NexusGraph system analyzes your organizational knowledge graph to provide contextual answers with citations. Connect your databases and LLM to see real results.",
            "citations": [
                Citation(
                    source="slack",
                    id="demo_msg",
                    url="https://example.com/slack",
                    excerpt="Demo message from Slack"
                ),
            ]
        }
    }
    
    # Select appropriate demo data based on query keywords
    query_lower = query.lower()
    if any(keyword in query_lower for keyword in ["auth", "authentication", "login", "oauth"]):
        demo_data = demo_entities["auth"]
    else:
        demo_data = demo_entities["default"]
    
    return QueryResponse(
        answer=demo_data["answer"],
        citations=demo_data["citations"],
        visualization=GraphVisualization(
            nodes=demo_data["nodes"],
            links=demo_data["links"]
        ),
        confidence_score=0.85,
        processing_time_ms=150
    )


@router.post("/query", response_model=QueryResponse)
async def query_knowledge_graph(request: QueryRequest):
    """
    Query the knowledge graph using hybrid retrieval.
    
    DEMO MODE: Returns realistic mock data without requiring API keys or databases.
    
    This endpoint implements the multi-step retrieval process:
    1. Generate embedding for the query
    2. Search Qdrant for semantically similar entities (top K)
    3. Traverse Neo4j graph from seed entities (1-2 hops)
    4. Synthesize context and generate answer using LLM
    5. Return answer with citations and visualization data
    
    Args:
        request: Query request with natural language question
        
    Returns:
        QueryResponse with answer, citations, and optional visualization
    """
    start_time = time.time()
    
    try:
        logger.info(f"Processing query: {request.query}")
        
        if settings.demo_mode or not settings.has_openai_key:
            logger.info("Running in DEMO MODE - using mock data")
            response = generate_demo_response(request.query)
            
            # Update processing time
            processing_time = int((time.time() - start_time) * 1000)
            response.processing_time_ms = processing_time
            
            # Remove visualization if not requested
            if not request.include_visualization:
                response.visualization = None
            
            return response
        
        # TODO: Real implementation when API keys are configured
        # Step 1: Generate query embedding
        # query_embedding = await generate_query_embedding(request.query)
        
        # Step 2: Search Qdrant for similar entities
        # similar_entities = await qdrant_client.search(...)
        
        # Step 3: Extract entity IDs and query Neo4j
        # seed_ids = [entity.payload["entity_id"] for entity in similar_entities]
        # subgraph = await neo4j_client.get_subgraph(seed_ids, max_hops=settings.max_hops)
        
        # Step 4: Synthesize context
        # context = build_context(similar_entities, subgraph)
        
        # Step 5: Generate answer using LLM
        # answer = await generate_answer(request.query, context)
        
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Real LLM integration requires API keys. Currently running in demo mode."
        )
        
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process query: {str(e)}"
        )


@router.get("/status", response_model=StatusResponse)
async def check_status():
    """
    Health check endpoint for the query service.
    
    Returns:
        StatusResponse with connection status for all services
    """
    try:
        # TODO: Check actual database connections
        # neo4j_connected = await neo4j_client.is_connected()
        # qdrant_connected = await qdrant_client.is_connected()
        
        # Demo mode status
        neo4j_connected = False
        qdrant_connected = False
        
        status_msg = "demo" if settings.demo_mode else "healthy"
        if not settings.has_openai_key:
            status_msg = "demo"
        
        return StatusResponse(
            status=status_msg,
            neo4j_connected=neo4j_connected,
            qdrant_connected=qdrant_connected,
            version=__version__
        )
        
    except Exception as e:
        logger.error(f"Error checking status: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check status: {str(e)}"
        )


@router.get("/search/global")
async def global_search(query: str):
    """
    Legacy endpoint for compatibility with existing frontend.
    Redirects to the new /query endpoint.
    
    Args:
        query: Search query string
        
    Returns:
        Search results in legacy format
    """
    # Convert to new format
    request = QueryRequest(query=query, include_visualization=True)
    response = await query_knowledge_graph(request)
    
    # Convert to legacy format if needed
    return {
        "query": query,
        "answer": response.answer,
        "citations": [c.dict() for c in response.citations],
        "graph": response.visualization.dict() if response.visualization else None
    }


@router.get("/search/local")
async def local_search(query: str):
    """
    Legacy endpoint for local search.
    Currently redirects to global search.
    
    Args:
        query: Search query string
        
    Returns:
        Search results
    """
    return await global_search(query)

# Made with Bob
