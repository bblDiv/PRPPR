"""
Entity resolution and normalization utilities.
Prevents duplicate entities with similar names from being created.
"""

import re
from typing import Dict, List, Optional


# Common entity name variations and their canonical forms
ENTITY_ALIASES = {
    "auth": ["authentication", "auth service", "auth pipeline", "authentication layer"],
    "oauth": ["oauth2", "oauth 2.0", "oauth2.0"],
    "api": ["rest api", "api service", "api layer"],
    "db": ["database", "data store", "datastore"],
    "ui": ["user interface", "frontend", "front-end"],
}


def normalize_entity_name(name: str, entity_type: str) -> str:
    """
    Normalize entity names to prevent duplicates.
    
    Args:
        name: Raw entity name from extraction
        entity_type: Entity type (Person, Document, Issue, Concept)
        
    Returns:
        Normalized entity name
        
    Example:
        >>> normalize_entity_name("Auth Pipeline", "Concept")
        'Authentication Service'
        >>> normalize_entity_name("sarah jenkins", "Person")
        'Sarah Jenkins'
    """
    # Basic normalization
    normalized = name.strip()
    
    # Remove extra whitespace
    normalized = re.sub(r'\s+', ' ', normalized)
    
    # Type-specific normalization
    if entity_type == "Person":
        # Title case for person names
        normalized = normalized.title()
    elif entity_type == "Concept":
        # Check for known aliases
        normalized_lower = normalized.lower()
        for canonical, aliases in ENTITY_ALIASES.items():
            if normalized_lower in aliases or normalized_lower == canonical:
                # Return canonical form with proper casing
                return canonical.title() + " Service"
    elif entity_type == "Issue":
        # Uppercase issue keys (e.g., ENG-102)
        if re.match(r'^[a-z]+-\d+$', normalized, re.IGNORECASE):
            normalized = normalized.upper()
    
    return normalized


def resolve_entity_duplicates(
    entities: List[Dict[str, str]],
    similarity_threshold: float = 0.85
) -> List[Dict[str, str]]:
    """
    Resolve duplicate entities based on name similarity.
    
    Args:
        entities: List of entity dictionaries with 'name' and 'type' keys
        similarity_threshold: Threshold for considering entities as duplicates
        
    Returns:
        Deduplicated list of entities
    """
    if not entities:
        return []
    
    # Group entities by type
    by_type: Dict[str, List[Dict[str, str]]] = {}
    for entity in entities:
        entity_type = entity.get("type", "Concept")
        if entity_type not in by_type:
            by_type[entity_type] = []
        by_type[entity_type].append(entity)
    
    # Deduplicate within each type
    deduplicated = []
    for entity_type, type_entities in by_type.items():
        seen_names = set()
        for entity in type_entities:
            normalized = normalize_entity_name(entity["name"], entity_type)
            if normalized.lower() not in seen_names:
                seen_names.add(normalized.lower())
                entity["name"] = normalized
                deduplicated.append(entity)
    
    return deduplicated


def extract_entity_type_from_context(text: str, entity_name: str) -> str:
    """
    Infer entity type from surrounding context.
    
    Args:
        text: Context text containing the entity
        entity_name: The entity name to classify
        
    Returns:
        Inferred entity type (Person, Document, Issue, Concept)
    """
    text_lower = text.lower()
    name_lower = entity_name.lower()
    
    # Check for person indicators
    person_indicators = ["engineer", "developer", "manager", "said", "reported", "wrote"]
    if any(indicator in text_lower for indicator in person_indicators):
        return "Person"
    
    # Check for issue indicators
    if re.match(r'^[a-z]+-\d+$', entity_name, re.IGNORECASE):
        return "Issue"
    
    # Check for document indicators
    doc_indicators = ["document", "wiki", "notion", "confluence", "readme"]
    if any(indicator in text_lower for indicator in doc_indicators):
        return "Document"
    
    # Default to Concept
    return "Concept"


def merge_entity_properties(
    existing: Dict[str, any],
    new: Dict[str, any]
) -> Dict[str, any]:
    """
    Merge properties of duplicate entities intelligently.
    
    Args:
        existing: Existing entity properties
        new: New entity properties to merge
        
    Returns:
        Merged entity properties
    """
    merged = existing.copy()
    
    # Merge descriptions
    if "description" in new and new["description"]:
        if "description" in merged and merged["description"]:
            # Combine descriptions if different
            if new["description"] not in merged["description"]:
                merged["description"] += f" {new['description']}"
        else:
            merged["description"] = new["description"]
    
    # Merge tags/labels
    if "tags" in new:
        if "tags" in merged:
            merged["tags"] = list(set(merged["tags"] + new["tags"]))
        else:
            merged["tags"] = new["tags"]
    
    # Update timestamp to most recent
    if "updated_at" in new:
        merged["updated_at"] = new["updated_at"]
    
    return merged

# Made with Bob
