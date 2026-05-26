# Vinculum Backend - Quick Start Guide

This guide will help you view and test the Vinculum backend implementation.

## 📋 Prerequisites

Before starting, ensure you have:
- Python 3.11 or higher
- Docker Desktop (for Neo4j and Qdrant)
- OpenAI API key
- Git

## 🚀 Step 1: View the Project Structure

The backend has been created in the `backend/` directory. You can explore it in VS Code:

```
backend/
├── app/                    # Main application code
│   ├── api/v1/            # API endpoints
│   ├── core/              # Business logic
│   ├── models/            # Data schemas
│   ├── utils/             # Utilities
│   ├── config.py          # Configuration
│   └── main.py            # FastAPI app entry point
├── docker-compose.yml     # Database setup
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
└── README.md             # Full documentation
```

## 🔍 Step 2: Review Key Files

### View the API Documentation
Open `backend/README.md` to see:
- Architecture overview
- API endpoint specifications
- Configuration options
- Deployment instructions

### View Implementation Details
Open `backend/IMPLEMENTATION_GUIDE.md` for:
- Step-by-step completion instructions
- Code examples for pending components
- Testing strategies

### View Project Summary
Open `PROJECT_SUMMARY.md` (in root) for:
- Complete system architecture
- Data flow diagrams
- Current status
- Technology stack

## 🏃 Step 3: Run the Backend (Basic Test)

### Option A: Quick Test (Without Databases)

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create environment file:**
```bash
# Copy the example
copy .env.example .env    # Windows
# OR
cp .env.example .env      # Mac/Linux

# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here
```

5. **Run the application:**
```bash
python -m app.main
```

6. **View the API documentation:**
Open your browser to:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

### Option B: Full Setup (With Databases)

1. **Start databases with Docker:**
```bash
cd backend
docker-compose up -d
```

This will start:
- Neo4j at http://localhost:7474 (username: neo4j, password: password)
- Qdrant at http://localhost:6333

2. **Follow steps 2-6 from Option A above**

3. **Verify database connections:**
- Neo4j Browser: http://localhost:7474
- Qdrant Dashboard: http://localhost:6333/dashboard

## 🧪 Step 4: Test the API

### Using Swagger UI (Recommended)

1. Go to http://localhost:8000/docs
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

### Example: Test Health Check

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "0.1.0"
}
```

### Example: Test Status Endpoint

```bash
curl http://localhost:8000/api/v1/status
```

Expected response:
```json
{
  "status": "degraded",
  "neo4j_connected": false,
  "qdrant_connected": false,
  "version": "0.1.0"
}
```

Note: Connections will show `false` until database clients are implemented.

### Example: Test Ingestion Endpoint

```bash
curl -X POST http://localhost:8000/api/v1/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "source_system": "slack",
    "event_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-05-16T03:00:00Z",
    "payload": {
      "author_id": "U12345",
      "author_name": "Sarah Jenkins",
      "content_body": "We need to deprecate the legacy auth protocol due to timeout issues.",
      "resource_id": "msg_9982",
      "parent_resource_id": null,
      "tags": ["authentication", "critical"]
    }
  }'
```

### Example: Test Query Endpoint

```bash
curl -X POST http://localhost:8000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Why did we drop support for the legacy authentication protocol?",
    "include_visualization": true
  }'
```

## 📊 Step 5: View in VS Code

### Explore the Code

1. **Open VS Code** in the project directory
2. **Navigate to `backend/` folder** in the Explorer
3. **Key files to review:**
   - `app/main.py` - FastAPI application setup
   - `app/api/v1/ingest.py` - Ingestion endpoint
   - `app/api/v1/query.py` - Query endpoint
   - `app/models/` - Data schemas
   - `app/core/` - Business logic

### View API Documentation Files

- `backend/README.md` - Main documentation
- `backend/IMPLEMENTATION_GUIDE.md` - Implementation steps
- `PROJECT_SUMMARY.md` - System overview

### Check Docker Services

```bash
# View running containers
docker ps

# View Neo4j logs
docker logs vinculum-neo4j

# View Qdrant logs
docker logs vinculum-qdrant
```

## 🎨 Step 6: View with Frontend (Optional)

To see how the backend integrates with the existing GraphRAG Visualizer:

1. **In the project root**, create `.env`:
```bash
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

2. **Start the frontend:**
```bash
npm install
npm start
```

3. **Open browser** to http://localhost:3000

4. **Try the search feature** - it will connect to your backend API

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Change port in backend/.env
API_PORT=8001

# Or stop conflicting service
# Windows: netstat -ano | findstr :8000
# Mac/Linux: lsof -i :8000
```

### Import Errors
```bash
# Ensure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Remove volumes and restart
docker-compose down -v
docker-compose up -d
```

### OpenAI API Errors
- Verify your API key in `.env`
- Check your OpenAI account has credits
- Ensure `OPENAI_API_KEY` is set correctly

## 📚 Next Steps

1. **Review the code** in VS Code
2. **Test the API endpoints** using Swagger UI
3. **Read the documentation** files
4. **Follow IMPLEMENTATION_GUIDE.md** to complete pending components
5. **Run tests** (once implemented)

## 🆘 Getting Help

- Check `backend/README.md` for detailed documentation
- Review `backend/IMPLEMENTATION_GUIDE.md` for implementation steps
- Check `PROJECT_SUMMARY.md` for architecture overview
- Review error logs in terminal
- Check Docker logs: `docker logs vinculum-neo4j`

## 📝 What's Working Now

✅ FastAPI application runs
✅ API documentation accessible
✅ Endpoints accept requests
✅ Data validation works
✅ Text chunking functional
✅ LLM entity extraction configured
✅ Response schemas validated

## ⚠️ What Needs Implementation

❌ Database client connections (Neo4j, Qdrant)
❌ Actual data storage operations
❌ Hybrid retrieval engine
❌ Complete end-to-end flow
❌ Test suite

See `backend/IMPLEMENTATION_GUIDE.md` for completion steps.

---

**Quick Command Reference:**

```bash
# Start everything
cd backend
docker-compose up -d
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m app.main

# View API docs
# http://localhost:8000/docs

# Stop everything
# Ctrl+C (stop Python)
docker-compose down