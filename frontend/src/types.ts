export interface Task {
    id: number;
    title: string;
    description?: string;
    status: string;
    due_date: string;
  }
  
  export interface TaskCreate {
    title: string;
    description?: string;
    status: string;
    due_date: string;
  }
  
  export interface TaskStatusUpdate {
    status: string;
  }