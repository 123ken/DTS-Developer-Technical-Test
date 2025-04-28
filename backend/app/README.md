# DTS Developer Technical Test Backend

This is a simple FastAPI application for managing tasks. It allows users to create, retrieve, update, and delete tasks with properties such as title, optional description, status, and due date/time.

## Project Structure

```
backend
├── app
│   ├── main.py                # Entry point of the FastAPI application
│   ├── models
│   │   └── task.py            # SQLAlchemy model for tasks
│   ├── controllers
│   │   └── task_controller.py  # Controller for task operations
│   ├── schemas
│   │   └── task_schema.py      # Pydantic schemas for task validation
│   └── database.py             # Database connection and session management
├── requirements.txt            # Project dependencies
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <https://github.com/123ken/DTS-Developer-Technical-Test.git>
   cd backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```
   uvicorn app.main:app --reload
   ```

## API Usage

### Create a Task

- **Endpoint:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Optional task description",
    "status": "pending",
    "due_date": "2023-10-31T12:00:00"
  }
  ```

### Retrieve a Task by ID

- **Endpoint:** `GET /tasks/{id}`

### Retrieve All Tasks

- **Endpoint:** `GET /tasks`

### Update Task Status

- **Endpoint:** `PUT /tasks/{id}/status`
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```

### Delete a Task

- **Endpoint:** `DELETE /tasks/{id}`

## License

This project is licensed under the MIT License.