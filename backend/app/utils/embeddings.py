"""
Embedding generation utilities using OpenAI's text-embedding-3-small model.
"""

import asyncio
from typing import List

from openai import AsyncOpenAI

from ..config import settings


# Initialize OpenAI client
client = AsyncOpenAI(api_key=settings.openai_api_key)


async def generate_embedding(text: str) -> List[float]:
    """
    Generate embedding vector for a single text string.
    
    Args:
        text: Input text to embed
        
    Returns:
        List of floats representing the embedding vector (1536 dimensions)
        
    Raises:
        Exception: If embedding generation fails
    """
    try:
        response = await client.embeddings.create(
            model=settings.embedding_model,
            input=text,
            encoding_format="float"
        )
        return response.data[0].embedding
    except Exception as e:
        raise Exception(f"Failed to generate embedding: {str(e)}")


async def generate_embeddings_batch(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for multiple texts in batch.
    
    Args:
        texts: List of input texts to embed
        
    Returns:
        List of embedding vectors, one per input text
        
    Raises:
        Exception: If batch embedding generation fails
    """
    if not texts:
        return []
    
    try:
        response = await client.embeddings.create(
            model=settings.embedding_model,
            input=texts,
            encoding_format="float"
        )
        # Sort by index to maintain order
        sorted_data = sorted(response.data, key=lambda x: x.index)
        return [item.embedding for item in sorted_data]
    except Exception as e:
        raise Exception(f"Failed to generate batch embeddings: {str(e)}")


async def generate_query_embedding(query: str) -> List[float]:
    """
    Generate embedding for a search query.
    Alias for generate_embedding with semantic naming.
    
    Args:
        query: Search query text
        
    Returns:
        Embedding vector for the query
    """
    return await generate_embedding(query)


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """
    Calculate cosine similarity between two vectors.
    
    Args:
        vec1: First embedding vector
        vec2: Second embedding vector
        
    Returns:
        Cosine similarity score between -1 and 1
    """
    if len(vec1) != len(vec2):
        raise ValueError("Vectors must have the same dimension")
    
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = sum(a * a for a in vec1) ** 0.5
    magnitude2 = sum(b * b for b in vec2) ** 0.5
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    
    return dot_product / (magnitude1 * magnitude2)

# Made with Bob
