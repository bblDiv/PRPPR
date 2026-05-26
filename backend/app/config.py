"""
Configuration management for Vinculum backend.
Loads environment variables and provides typed configuration objects.
"""

from functools import lru_cache
from typing import List, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True

    # Neo4j Configuration
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "password"
    neo4j_database: str = "neo4j"

    # Qdrant Configuration
    qdrant_host: str = "localhost"
    qdrant_port: int = 6333
    qdrant_collection: str = "vinculum_entities"
    qdrant_api_key: str = ""

    # LLM Configuration - Made optional for demo mode
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    embedding_model: str = "text-embedding-3-small"
    llm_model: str = "gpt-4o"
    llm_temperature: float = 0.0
    
    # Demo mode - runs without API keys
    demo_mode: bool = True

    # Processing Configuration
    chunk_size: int = 250
    chunk_overlap: int = 25
    similarity_threshold: float = 0.65
    max_hops: int = 2
    top_k_results: int = 5

    # CORS Configuration
    cors_origins: str = "http://localhost:3000,https://noworneverev.github.io"

    # Logging
    log_level: str = "INFO"

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins string into list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def qdrant_url(self) -> str:
        """Construct Qdrant URL."""
        return f"http://{self.qdrant_host}:{self.qdrant_port}"
    
    @property
    def has_openai_key(self) -> bool:
        """Check if OpenAI API key is configured."""
        return bool(self.openai_api_key and self.openai_api_key != "")


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to ensure settings are loaded only once.
    """
    return Settings()


# Global settings instance
settings = get_settings()

# Made with Bob
