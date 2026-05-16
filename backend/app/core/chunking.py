"""
Text chunking utilities with sliding window overlap.
Implements the chunking protocol specified in the PRD.
"""

from typing import List, Tuple
import tiktoken

from ..config import settings


def chunk_text(
    text: str,
    chunk_size: int = None,
    overlap: int = None,
    encoding_name: str = "cl100k_base"
) -> List[Tuple[str, int, int]]:
    """
    Split text into overlapping chunks using token-based sliding window.
    
    Args:
        text: Input text to chunk
        chunk_size: Maximum tokens per chunk (default from settings)
        overlap: Number of overlapping tokens (default from settings)
        encoding_name: Tiktoken encoding to use
        
    Returns:
        List of tuples: (chunk_text, start_token_idx, end_token_idx)
        
    Example:
        >>> chunks = chunk_text("Long text here...", chunk_size=250, overlap=25)
        >>> len(chunks)
        3
    """
    if chunk_size is None:
        chunk_size = settings.chunk_size
    if overlap is None:
        overlap = settings.chunk_overlap
    
    # Initialize tokenizer
    try:
        encoding = tiktoken.get_encoding(encoding_name)
    except Exception:
        # Fallback to default encoding
        encoding = tiktoken.get_encoding("cl100k_base")
    
    # Tokenize the text
    tokens = encoding.encode(text)
    
    # If text is shorter than chunk size, return as single chunk
    if len(tokens) <= chunk_size:
        return [(text, 0, len(tokens))]
    
    chunks = []
    start_idx = 0
    
    while start_idx < len(tokens):
        # Calculate end index for this chunk
        end_idx = min(start_idx + chunk_size, len(tokens))
        
        # Extract token slice
        chunk_tokens = tokens[start_idx:end_idx]
        
        # Decode back to text
        chunk_text = encoding.decode(chunk_tokens)
        
        # Store chunk with metadata
        chunks.append((chunk_text, start_idx, end_idx))
        
        # Move start index forward (chunk_size - overlap)
        # This creates the sliding window effect
        if end_idx >= len(tokens):
            break
        
        start_idx += (chunk_size - overlap)
    
    return chunks


def estimate_tokens(text: str, encoding_name: str = "cl100k_base") -> int:
    """
    Estimate the number of tokens in a text string.
    
    Args:
        text: Input text
        encoding_name: Tiktoken encoding to use
        
    Returns:
        Estimated token count
    """
    try:
        encoding = tiktoken.get_encoding(encoding_name)
    except Exception:
        encoding = tiktoken.get_encoding("cl100k_base")
    
    return len(encoding.encode(text))


def should_chunk(text: str, threshold: int = 500) -> bool:
    """
    Determine if text should be chunked based on character length.
    
    Args:
        text: Input text
        threshold: Character count threshold (default 500 per PRD)
        
    Returns:
        True if text exceeds threshold and should be chunked
    """
    return len(text) > threshold

# Made with Bob
