"""
LLM-based graph transformer for extracting entities and relationships.
Uses structured output to generate Subject-Predicate-Object triplets.
"""

from typing import List, Dict, Tuple
import json

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

from ..config import settings
from .entity_resolver import normalize_entity_name


class ExtractedEntity(BaseModel):
    """Structured entity extraction result."""
    name: str = Field(description="Entity name")
    type: str = Field(description="Entity type: Person, Document, Issue, or Concept")
    description: str = Field(description="Brief description of the entity")


class ExtractedRelationship(BaseModel):
    """Structured relationship extraction result."""
    source: str = Field(description="Source entity name")
    target: str = Field(description="Target entity name")
    type: str = Field(description="Relationship type: AUTHORED, DISCUSSED, RESOLVES, DEPENDS_ON, MENTIONS, or RELATED")
    description: str = Field(description="Description of the relationship")


class GraphExtractionResult(BaseModel):
    """Complete graph extraction result."""
    entities: List[ExtractedEntity] = Field(default_factory=list)
    relationships: List[ExtractedRelationship] = Field(default_factory=list)


# Initialize LLM
llm = ChatOpenAI(
    model=settings.llm_model,
    temperature=settings.llm_temperature,
    api_key=settings.openai_api_key
)

# Create output parser
parser = PydanticOutputParser(pydantic_object=GraphExtractionResult)

# Define extraction prompt
EXTRACTION_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at extracting structured knowledge graphs from text.
Extract entities and relationships following these rules:

ENTITY TYPES:
- Person: People, engineers, managers, team members
- Document: Documentation, wikis, Notion pages, README files
- Issue: Jira tickets, bugs, tasks (format: KEY-123)
- Concept: Software components, systems, features, technologies

RELATIONSHIP TYPES:
- AUTHORED: Person created Document or Issue
- DISCUSSED: Person talked about Concept
- RESOLVES: Issue addresses/fixes Concept
- DEPENDS_ON: Issue depends on another Issue
- MENTIONS: Document references Concept or Person
- RELATED: Generic relationship between entities

Extract ALL entities and relationships from the text. Be thorough.
Normalize entity names (e.g., "auth service" and "authentication" should be the same entity).

{format_instructions}"""),
    ("user", "Extract entities and relationships from this text:\n\n{text}")
])

# Format the prompt with parser instructions
extraction_chain = EXTRACTION_PROMPT | llm | parser


async def extract_entities_and_relationships(
    text: str,
    source_context: Dict[str, str] = None
) -> Tuple[List[Dict], List[Dict]]:
    """
    Extract entities and relationships from text using LLM.
    
    Args:
        text: Input text to analyze
        source_context: Optional context (source_system, author, etc.)
        
    Returns:
        Tuple of (entities_list, relationships_list)
        
    Example:
        >>> entities, rels = await extract_entities_and_relationships(
        ...     "Sarah reported auth timeout in ENG-102"
        ... )
        >>> len(entities)
        3  # Sarah, auth system, ENG-102
    """
    try:
        # Invoke the extraction chain
        result = await extraction_chain.ainvoke({
            "text": text,
            "format_instructions": parser.get_format_instructions()
        })
        
        # Process entities
        entities = []
        for entity in result.entities:
            normalized_name = normalize_entity_name(entity.name, entity.type)
            entities.append({
                "name": normalized_name,
                "type": entity.type,
                "description": entity.description,
                "source_text": text[:200]  # Keep snippet for reference
            })
        
        # Process relationships
        relationships = []
        for rel in result.relationships:
            # Normalize entity names in relationships
            source_name = normalize_entity_name(rel.source, "Concept")  # Default type
            target_name = normalize_entity_name(rel.target, "Concept")
            
            relationships.append({
                "source": source_name,
                "target": target_name,
                "type": rel.type,
                "description": rel.description
            })
        
        # Add context-based entities if provided
        if source_context:
            if "author_name" in source_context:
                # Ensure author is included as Person entity
                author_entity = {
                    "name": source_context["author_name"],
                    "type": "Person",
                    "description": f"Author from {source_context.get('source_system', 'system')}",
                    "source_text": text[:200]
                }
                # Check if not already in entities
                if not any(e["name"] == author_entity["name"] for e in entities):
                    entities.append(author_entity)
        
        return entities, relationships
        
    except Exception as e:
        # Log error and return empty results
        print(f"Error extracting entities: {str(e)}")
        return [], []


async def extract_with_fallback(
    text: str,
    source_context: Dict[str, str] = None
) -> Tuple[List[Dict], List[Dict]]:
    """
    Extract entities with fallback to simpler extraction if LLM fails.
    
    Args:
        text: Input text
        source_context: Optional context
        
    Returns:
        Tuple of (entities_list, relationships_list)
    """
    try:
        return await extract_entities_and_relationships(text, source_context)
    except Exception as e:
        print(f"LLM extraction failed, using fallback: {str(e)}")
        # Simple fallback: extract author as entity
        entities = []
        if source_context and "author_name" in source_context:
            entities.append({
                "name": source_context["author_name"],
                "type": "Person",
                "description": "Author",
                "source_text": text[:200]
            })
        return entities, []


def validate_extraction_result(
    entities: List[Dict],
    relationships: List[Dict]
) -> Tuple[List[Dict], List[Dict]]:
    """
    Validate and clean extraction results.
    
    Args:
        entities: Extracted entities
        relationships: Extracted relationships
        
    Returns:
        Cleaned (entities, relationships)
    """
    # Remove duplicate entities
    seen_entities = set()
    clean_entities = []
    for entity in entities:
        key = (entity["name"].lower(), entity["type"])
        if key not in seen_entities:
            seen_entities.add(key)
            clean_entities.append(entity)
    
    # Remove relationships with missing entities
    entity_names = {e["name"].lower() for e in clean_entities}
    clean_relationships = [
        rel for rel in relationships
        if rel["source"].lower() in entity_names and rel["target"].lower() in entity_names
    ]
    
    return clean_entities, clean_relationships

# Made with Bob
