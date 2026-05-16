"""
Hashing utilities for generating deterministic IDs.
Uses SHA-256 to ensure idempotency during ingestion.
"""

import hashlib
from typing import Optional


def generate_chunk_id(text: str, source_id: Optional[str] = None) -> str:
    """
    Generate a deterministic chunk ID using SHA-256 hash.
    
    Args:
        text: The text content to hash
        source_id: Optional source identifier to include in hash
        
    Returns:
        Hexadecimal string representation of SHA-256 hash
        
    Example:
        >>> generate_chunk_id("Hello world")
        '64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c'
    """
    content = text
    if source_id:
        content = f"{source_id}:{text}"
    
    return hashlib.sha256(content.encode('utf-8')).hexdigest()


def generate_entity_id(entity_name: str, entity_type: str) -> str:
    """
    Generate a deterministic entity ID based on name and type.
    
    Args:
        entity_name: The entity name/title
        entity_type: The entity type (Person, Document, Issue, Concept)
        
    Returns:
        Hexadecimal string representation of SHA-256 hash
        
    Example:
        >>> generate_entity_id("Sarah Jenkins", "Person")
        'person_a1b2c3d4e5f6...'
    """
    # Normalize entity name (lowercase, strip whitespace)
    normalized_name = entity_name.lower().strip()
    normalized_type = entity_type.lower()
    
    # Create composite string
    composite = f"{normalized_type}:{normalized_name}"
    
    # Generate hash
    hash_hex = hashlib.sha256(composite.encode('utf-8')).hexdigest()
    
    # Return with type prefix for readability
    return f"{normalized_type}_{hash_hex[:16]}"


def generate_relationship_id(source_id: str, target_id: str, rel_type: str) -> str:
    """
    Generate a deterministic relationship ID.
    
    Args:
        source_id: Source node ID
        target_id: Target node ID
        rel_type: Relationship type
        
    Returns:
        Hexadecimal string representation of SHA-256 hash
    """
    composite = f"{source_id}:{rel_type}:{target_id}"
    return hashlib.sha256(composite.encode('utf-8')).hexdigest()[:32]

# Made with Bob
