from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskUpdate

class TaskController:
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task: TaskCreate):
        db_task = Task(title=task.title, description=task.description, status=task.status, due_date=task.due_date)
        self.db.add(db_task)
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def get_task_by_id(self, task_id: int):
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        return task

    def get_all_tasks(self):
        return self.db.query(Task).all()

    def update_task_status(self, task_id: int, task_update: TaskUpdate):
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        task.status = task_update.status
        self.db.commit()
        return task

    def delete_task(self, task_id: int):
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        self.db.delete(task)
        self.db.commit()