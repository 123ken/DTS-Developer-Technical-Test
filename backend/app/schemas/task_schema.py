from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    due_date: Optional[datetime] = None 

class TaskCreate(TaskBase):
    pass

class TaskStatusUpdate(BaseModel):
    status: str
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskResponse(TaskBase):
    id: int
    due_date: Optional[datetime] = None 

    class Config:
        from_attributes = True 