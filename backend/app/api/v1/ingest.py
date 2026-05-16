"""
Ingestion API endpoints for webhook data processing.
Handles Slack, Jira, and Notion webhook payloads.
"""

from fastapi import APIRouter, HTTPException, status
from datetime import datetime
import logging

from ...models.ingestion import IngestionPayload, IngestionResponse, GraphMutations
from ...core.chunking import chunk_text, should_chunk
from ...core.graph_transformer import extract_with_fallback, validate_extraction_result
from ...utils.hashing import generate_chunk_id

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/ingest", response_model=IngestionResponse)
async def ingest_webhook_data(payload: IngestionPayload):
    """
    Process incoming webhook data from Slack, Jira, or Notion.
    
    This endpoint:
    1. Validates the incoming payload
    2. Chunks text if necessary
    3. Extracts entities and relationships using LLM
    4. Stores data in Neo4j and Qdrant
    5. Returns processing statistics
    
    Args:
        payload: Standardized ingestion payload
        
    Returns:
        IngestionResponse with processing status and statistics
    """
    try:
        logger.info(f"Processing {payload.source_system} event: {payload.event_id}")
        
        # Extract content
        content = payload.payload.content_body
        
        # Prepare source context for entity extraction
        source_context = {
            "source_system": payload.source_system,
            "author_name": payload.payload.author_name,
            "author_id": payload.payload.author_id,
            "resource_id": payload.payload.resource_id,
            "timestamp": payload.timestamp.isoformat()
        }
        
        # Initialize counters
        nodes_added = 0
        edges_connected = 0
        nodes_updated = 0
        
        # Check if content needs chunking
        if should_chunk(content):
            logger.info(f"Chunking content (length: {len(content)})")
            chunks = chunk_text(content)
            
            # Process each chunk
            for chunk_text_content, start_idx, end_idx in chunks:
                chunk_id = generate_chunk_id(chunk_text_content, payload.event_id)
                
                # Extract entities and relationships from chunk
                entities, relationships = await extract_with_fallback(
                    chunk_text_content,
                    source_context
                )
                
                # Validate extraction
                entities, relationships = validate_extraction_result(entities, relationships)
                
                logger.info(f"Chunk {chunk_id}: {len(entities)} entities, {len(relationships)} relationships")
                
                # TODO: Store in Neo4j and Qdrant
                # nodes_added += await store_entities(entities, chunk_id)
                # edges_connected += await store_relationships(relationships, chunk_id)
                
                # Placeholder counts
                nodes_added += len(entities)
                edges_connected += len(relationships)
        else:
            # Process entire content as single unit
            logger.info("Processing content without chunking")
            
            entities, relationships = await extract_with_fallback(
                content,
                source_context
            )
            
            # Validate extraction
            entities, relationships = validate_extraction_result(entities, relationships)
            
            logger.info(f"Extracted {len(entities)} entities, {len(relationships)} relationships")
            
            # TODO: Store in Neo4j and Qdrant
            # nodes_added = await store_entities(entities, payload.event_id)
            # edges_connected = await store_relationships(relationships, payload.event_id)
            
            # Placeholder counts
            nodes_added = len(entities)
            edges_connected = len(relationships)
        
        # Return success response
        return IngestionResponse(
            status="success",
            processed_event_id=payload.event_id,
            graph_mutations=GraphMutations(
                nodes_added=nodes_added,
                edges_connected=edges_connected,
                nodes_updated=nodes_updated
            ),
            message=f"Successfully processed {payload.source_system} event"
        )
        
    except Exception as e:
        logger.error(f"Error processing ingestion: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process ingestion: {str(e)}"
        )


@router.get("/ingest/status")
async def get_ingestion_status():
    """
    Get ingestion pipeline status.
    
    Returns:
        Status information about the ingestion pipeline
    """
    return {
        "status": "operational",
        "supported_sources": ["slack", "jira", "notion"],
        "processing_queue_size": 0,  # TODO: Implement queue monitoring
        "last_processed": None  # TODO: Track last processed event
    }

# Made with Bob
