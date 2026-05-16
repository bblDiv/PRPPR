"""
Pydantic models for query requests and responses.
"""

from typing import List, Optional

from pydantic import BaseModel, Field

from .graph import GraphVisualization


class Citation(BaseModel):
    """Source citation for query responses."""
    
    source: str = Field(..., description="Source system (slack, jira, notion)")
    id: str = Field(..., description="Resource identifier in source system")
    url: str = Field(..., description="Direct URL to the source")
    excerpt: Optional[str] = Field(None, description="Relevant text excerpt")

    class Config:
        json_schema_extra = {
            "example": {
                "source": "slack",
                "id": "msg_9982",
                "url": "https://slack.com/archives/C123/p1234567890",
                "excerpt": "We need to deprecate the legacy auth protocol..."
            }
        }


class QueryRequest(BaseModel):
    """Request payload for knowledge graph queries."""
    
    query: str = Field(
        ..., 
        min_length=3,
        max_length=500,
        description="Natural language query"
    )
    include_visualization: bool = Field(
        default=True,
        description="Whether to include graph visualization data"
    )
    max_results: Optional[int] = Field(
        default=None,
        ge=1,
        le=20,
        description="Maximum number of results to return"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "query": "Why did we drop support for the legacy authentication protocol last sprint?",
                "include_visualization": True,
                "max_results": 10
            }
        }


class QueryResponse(BaseModel):
    """
    Response payload for knowledge graph queries.
    Includes answer, citations, and optional visualization data.
    """
    
    answer: str = Field(
        ..., 
        description="Natural language answer to the query"
    )
    citations: List[Citation] = Field(
        default_factory=list,
        description="Source citations supporting the answer"
    )
    visualization: Optional[GraphVisualization] = Field(
        None,
        description="Graph visualization data for 3d-force-graph"
    )
    confidence_score: Optional[float] = Field(
        None,
        ge=0.0,
        le=1.0,
        description="Confidence score for the answer (0.0-1.0)"
    )
    processing_time_ms: Optional[int] = Field(
        None,
        description="Query processing time in milliseconds"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "answer": "We deprecated the legacy authentication protocol because Engineer Sarah reported 4 runtime timeout errors on Slack, which led to Critical Jira Ticket #102. Documentation for the modern OAuth2 strategy was updated on Notion last Tuesday.",
                "citations": [
                    {
                        "source": "slack",
                        "id": "msg_9982",
                        "url": "https://slack.com/archives/...",
                        "excerpt": "Experiencing timeout errors with legacy auth"
                    },
                    {
                        "source": "jira",
                        "id": "ENG-102",
                        "url": "https://jira.company.com/browse/ENG-102",
                        "excerpt": "Critical: Auth timeout failures"
                    }
                ],
                "visualization": {
                    "nodes": [
                        {
                            "id": "sarah_id",
                            "label": "Sarah Jenkins",
                            "group": "Person",
                            "val": 25
                        },
                        {
                            "id": "eng_102",
                            "label": "Jira: ENG-102 Auth Failures",
                            "group": "Issue",
                            "val": 40
                        }
                    ],
                    "links": [
                        {
                            "source": "sarah_id",
                            "target": "eng_102",
                            "type": "AUTHORED",
                            "weight": 1.0
                        }
                    ]
                },
                "confidence_score": 0.92,
                "processing_time_ms": 1250
            }
        }


class StatusResponse(BaseModel):
    """Health check response."""
    
    status: str = Field(default="healthy", description="Service status")
    neo4j_connected: bool = Field(..., description="Neo4j connection status")
    qdrant_connected: bool = Field(..., description="Qdrant connection status")
    version: str = Field(..., description="API version")

# Made with Bob
