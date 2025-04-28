
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.task import Task

from app.schemas.task_schema import TaskCreate, TaskStatusUpdate, TaskResponse
from app.database import get_db

class TaskController:
    def __init__(self):
      
        self.router = APIRouter()

        self.router.add_api_route(
            "/",
            self.create_task,
            methods=["POST"],
            response_model=TaskResponse,
            status_code=status.HTTP_201_CREATED
        )
        self.router.add_api_route(
            "/{task_id}",
            self.get_task_by_id,
            methods=["GET"],
            response_model=TaskResponse
        )
        self.router.add_api_route(
            "/",
            self.get_all_tasks,
            methods=["GET"],
            response_model=List[TaskResponse]
        )
      
        self.router.add_api_route(
            "/{task_id}/status",
            self.update_task_status,
            methods=["PUT"],
            response_model=TaskResponse
        )
        self.router.add_api_route(
            "/{task_id}",
            self.delete_task,
            methods=["DELETE"],
            status_code=status.HTTP_204_NO_CONTENT
        )


    def create_task(self, task: TaskCreate, db: Session = Depends(get_db)):
        db_task = Task(**task.model_dump()) # Use model_dump for Pydantic v2+
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    def get_task_by_id(self, task_id: int, db: Session = Depends(get_db)):
        task = db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
        return task

    def get_all_tasks(self, db: Session = Depends(get_db)):
        return db.query(Task).all()


    def update_task_status(self, task_id: int, task_update: TaskStatusUpdate, db: Session = Depends(get_db)):
        task = db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
        task.status = task_update.status 
        db.commit()
        db.refresh(task)
        return task

    def delete_task(self, task_id: int, db: Session = Depends(get_db)):
        task = db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
        db.delete(task)
        db.commit()
 