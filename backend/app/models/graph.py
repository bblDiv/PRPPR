"""
Pydantic models for graph nodes, edges, and visualization data.
Designed to be compatible with 3d-force-graph frontend library.
"""

from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class GraphNode(BaseModel):
    """
    Graph node representation compatible with 3d-force-graph.
    Represents entities in the knowledge graph.
    """
    
    id: str = Field(..., description="Unique node identifier")
    label: str = Field(..., description="Display label for the node")
    group: Literal["Person", "Document", "Issue", "Concept"] = Field(
        ..., 
        description="Node type/category"
    )
    val: int = Field(
        default=10, 
        ge=1, 
        le=100, 
        description="Node size value for visualization (1-100)"
    )
    description: Optional[str] = Field(
        None, 
        description="Detailed description of the entity"
    )
    source_url: Optional[str] = Field(
        None, 
        description="URL to original source"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "id": "sarah_jenkins_001",
                "label": "Sarah Jenkins",
                "group": "Person",
                "val": 25,
                "description": "Senior Software Engineer",
                "source_url": "https://company.slack.com/team/sarah"
            }
        }


class GraphEdge(BaseModel):
    """
    Graph edge/relationship representation compatible with 3d-force-graph.
    Represents relationships between entities.
    """
    
    source: str = Field(..., description="Source node ID")
    target: str = Field(..., description="Target node ID")
    type: Literal[
        "AUTHORED", 
        "DISCUSSED", 
        "RESOLVES", 
        "DEPENDS_ON", 
        "MENTIONS",
        "RELATED"
    ] = Field(..., description="Relationship type")
    weight: float = Field(
        default=1.0, 
        ge=0.0, 
        le=1.0, 
        description="Relationship strength (0.0-1.0)"
    )
    description: Optional[str] = Field(
        None, 
        description="Description of the relationship"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "source": "sarah_jenkins_001",
                "target": "eng_102",
                "type": "AUTHORED",
                "weight": 1.0,
                "description": "Created the issue"
            }
        }


class GraphVisualization(BaseModel):
    """
    Complete graph visualization data structure.
    Contains nodes and links for 3d-force-graph rendering.
    """
    
    nodes: List[GraphNode] = Field(
        default_factory=list, 
        description="List of graph nodes"
    )
    links: List[GraphEdge] = Field(
        default_factory=list, 
        description="List of graph edges/relationships"
    )

    class Config:
        json_schema_extra = {
            "example": {
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
            }
        }


class Neo4jNode(BaseModel):
    """Internal representation of Neo4j node with properties."""
    
    id: str
    labels: List[str]
    properties: dict


class Neo4jRelationship(BaseModel):
    """Internal representation of Neo4j relationship."""
    
    id: str
    type: str
    start_node: str
    end_node: str
    properties: dict

# Made with Bob
