"""
Pydantic models for data ingestion payloads and responses.
"""

from datetime import datetime
from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class PayloadData(BaseModel):
    """Inner payload data structure from webhook sources."""
    
    author_id: str = Field(..., description="Unique identifier for the author")
    author_name: str = Field(..., description="Display name of the author")
    content_body: str = Field(..., description="Main text content to process")
    resource_id: str = Field(..., description="Unique identifier for the resource")
    parent_resource_id: Optional[str] = Field(None, description="Parent resource ID if nested")
    tags: List[str] = Field(default_factory=list, description="Associated tags or labels")


class IngestionPayload(BaseModel):
    """
    Standardized ingestion payload from Slack, Jira, or Notion webhooks.
    All incoming data must conform to this schema.
    """
    
    source_system: Literal["slack", "jira", "notion"] = Field(
        ..., 
        description="Source system identifier"
    )
    event_id: str = Field(
        ..., 
        description="Unique event identifier (UUIDv4)",
        pattern=r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
    )
    timestamp: datetime = Field(
        ..., 
        description="Event timestamp in ISO 8601 format"
    )
    payload: PayloadData = Field(..., description="Nested payload data")

    class Config:
        json_schema_extra = {
            "example": {
                "source_system": "slack",
                "event_id": "550e8400-e29b-41d4-a716-446655440000",
                "timestamp": "2026-05-16T03:00:00Z",
                "payload": {
                    "author_id": "U12345",
                    "author_name": "Sarah Jenkins",
                    "content_body": "We need to deprecate the legacy auth protocol due to timeout issues.",
                    "resource_id": "msg_9982",
                    "parent_resource_id": None,
                    "tags": ["authentication", "critical"]
                }
            }
        }


class GraphMutations(BaseModel):
    """Statistics about graph changes during ingestion."""
    
    nodes_added: int = Field(0, description="Number of nodes added to graph")
    edges_connected: int = Field(0, description="Number of edges created")
    nodes_updated: int = Field(0, description="Number of existing nodes updated")


class IngestionResponse(BaseModel):
    """Response returned after successful ingestion."""
    
    status: Literal["success", "partial", "failed"] = Field(
        ..., 
        description="Processing status"
    )
    processed_event_id: str = Field(
        ..., 
        description="Echo of the processed event ID"
    )
    graph_mutations: GraphMutations = Field(
        ..., 
        description="Statistics about graph modifications"
    )
    message: Optional[str] = Field(
        None, 
        description="Additional information or error details"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "processed_event_id": "550e8400-e29b-41d4-a716-446655440000",
                "graph_mutations": {
                    "nodes_added": 2,
                    "edges_connected": 3,
                    "nodes_updated": 1
                },
                "message": "Successfully processed Slack message"
            }
        }

# Made with Bob
