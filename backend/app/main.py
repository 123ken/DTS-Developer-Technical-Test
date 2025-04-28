
from fastapi import FastAPI
from app.database import engine 
from app.controllers.task_controller import TaskController
from app.models.task import Base 
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()


origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


task_controller = TaskController() 
app.include_router(task_controller.router, prefix="/tasks", tags=["tasks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task API"}