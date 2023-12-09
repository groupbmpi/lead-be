## Branch: submission
- adds crud to task_submission
- adds bulk search by fk to task_submission

## Modifications
- add taskSubmission model (./models/tasksubmission.js)
- add routing for task (./routes/taskSubmissionRoute.js)
- add CRUD endpoint for task model (./controllers/taskSubmissionController.js)

## Model Detail
- submission_id (PK) (INT) (NOT NULLABLE) (AUTO INCREMENT)
- task_id (FK:Task) (INT) (NOT NULLABLE)
- participant_id (FK:Task) (INT) (NOT NULLABLE)
- submission_url (VARCHAR) (NOT NULLABLE)
- feedback (TEXT) (NULLABLE)
- status (ENUM) (NOT NULLABLE) ('SUBMITTED','NOT SUBMITTED','SUBMITTED LATE')
- submission_time (DATETIME) (EDITABLE) (AUTO FROM BE)

## Endpoint Details
- GET `/api/v1/taskSubmission` (ADMINS, MENTOR) - getAllTaskSubmissions
- GET `/api/v1/taskSubmission/:id` (ALL) - getTaskSubmissionById
- PUT `/api/v1/taskSubmission/:id` (ADMINS, MENTOR) - updateTaskSubmission
- DELETE `/api/v1/taskSubmission/:id` (ADMINS, MENTOR) - deleteTaskSubmission
- GET `/api/v1/taskSubmission/task/:id` (ALL) - getAllTaskSubmissionByTaskId
- GET `/api/v1/taskSubmission/participant/:id` (ALL) - getAllTaskSubmissionByParticipantId
