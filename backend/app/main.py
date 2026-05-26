"""
FastAPI application entry point for Vinculum backend.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from .config import settings
from .api.v1 import ingest, query
from . import __version__


# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    logger.info("Starting Vinculum backend...")
    logger.info(f"Version: {__version__}")
    logger.info(f"Neo4j URI: {settings.neo4j_uri}")
    logger.info(f"Qdrant URL: {settings.qdrant_url}")
    
    # TODO: Initialize database connections
    # await neo4j_client.connect()
    # await qdrant_client.connect()
    
    yield
    
    # Shutdown
    logger.info("Shutting down Vinculum backend...")
    # TODO: Close database connections
    # await neo4j_client.close()
    # await qdrant_client.close()


# Create FastAPI application
app = FastAPI(
    title="Vinculum API",
    description="GraphRAG pipeline for organizational knowledge management",
    version=__version__,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    ingest.router,
    prefix="/api/v1",
    tags=["ingestion"]
)
app.include_router(
    query.router,
    prefix="/api/v1",
    tags=["query"]
)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "Vinculum API",
        "version": __version__,
        "status": "operational",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": __version__
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload
    )

# Made with Bob
