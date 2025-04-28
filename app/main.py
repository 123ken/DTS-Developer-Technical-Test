from fastapi import FastAPI
from app.database import engine
from app.controllers.task_controller import TaskController

app = FastAPI()

# Initialize the database
@app.on_event("startup")
async def startup():
    # Create the database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Include task routes
task_controller = TaskController()
app.include_router(task_controller.router, prefix="/tasks", tags=["tasks"])