## Branch: task-and-submission
adds crud to tasks

## Modifications
- add task model (./models/task.js)
- add routing for task (./routes/taskRoute.js)
- add CRUD endpoint for task model (./controllers/taskController.js)

## Model Detail
- task_id (PK) (INT) (NOT NULLABLE) (AUTO INCREMENT)
- mentor_id (FK:Mentors) (INT) (NOT NULLABLE)
- title (VARCHAR) (NOT NULLABLE)
- description (TEXT) (NULLABLE)
- deadline (DATETIME) (NOT NULLABLE)

## Endpoint Details
- POST `/api/v1/task` (ADMINS, MENTOR) - createTask
- GET `/api/v1/task` (ALL) - getAllTasks
- GET `/api/v1/task/:id` (ADMINS, MENTOR) - getTaskById
- PUT `/api/v1/task/:id` (ADMINS, MENTOR) - updateTask
- DELETE `/api/v1/task/:id` (ADMINS, MENTOR) - deleteTask
