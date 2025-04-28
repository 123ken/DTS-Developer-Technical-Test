from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    due_date: Optional[datetime] = None

    class Config:
        orm_mode = True