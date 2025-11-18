"""
Production-grade FastAPI application
Includes: logging, error handling, CORS, health checks, and structured responses
"""

import logging
import sys
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("app.log")
    ]
)
logger = logging.getLogger(__name__)


# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    # Startup
    logger.info("Application starting up...")
    # Initialize database connections, load models, etc.
    yield
    # Shutdown
    logger.info("Application shutting down...")
    # Close database connections, cleanup resources, etc.


# Initialize FastAPI app
app = FastAPI(
    title="Production API",
    description="A minimal production-grade FastAPI application",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)


# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str


class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float = Field(..., gt=0)


class ItemResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    created_at: str


class ErrorResponse(BaseModel):
    detail: str
    timestamp: str


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "timestamp": datetime.utcnow().isoformat()
        }
    )


# Middleware for request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response


# Health check endpoint
@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0"
    )


# Readiness check
@app.get("/ready", tags=["Health"])
async def readiness_check():
    """Readiness check for Kubernetes/load balancers"""
    # Check database connections, external services, etc.
    return {"status": "ready"}


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to the Production API",
        "docs": "/docs",
        "health": "/health"
    }


# Example CRUD endpoints
# In-memory storage (use database in production)
items_db = {}
item_id_counter = 1


@app.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED, tags=["Items"])
async def create_item(item: ItemCreate):
    """Create a new item"""
    global item_id_counter
    
    item_id = item_id_counter
    item_id_counter += 1
    
    new_item = ItemResponse(
        id=item_id,
        name=item.name,
        description=item.description,
        price=item.price,
        created_at=datetime.utcnow().isoformat()
    )
    
    items_db[item_id] = new_item
    logger.info(f"Created item with ID: {item_id}")
    
    return new_item


@app.get("/items/{item_id}", response_model=ItemResponse, tags=["Items"])
async def get_item(item_id: int):
    """Get an item by ID"""
    if item_id not in items_db:
        logger.warning(f"Item not found: {item_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    return items_db[item_id]


@app.get("/items", response_model=list[ItemResponse], tags=["Items"])
async def list_items():
    """List all items"""
    return list(items_db.values())


@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Items"])
async def delete_item(item_id: int):
    """Delete an item by ID"""
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    del items_db[item_id]
    logger.info(f"Deleted item with ID: {item_id}")
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Set to False in production
        log_level="info"
    )