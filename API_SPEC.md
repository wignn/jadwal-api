# API Specification

Base URL: `http://localhost:3000/api`

## Response Format

All responses follow this format:
```json
{
  "data": <response_data> | null,
  "errors": <error_message> | null
}
```

---

## Course API

### 1. Create Course
- **Endpoint**: `POST /api/courses`
- **Request Body**:
```json
{
  "code": "CS101",
  "name": "Introduction to Computer Science"
}
```
- **Response** (201):
```json
{
  "data": {
    "id": 1,
    "code": "CS101",
    "name": "Introduction to Computer Science",
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 2. Get All Courses
- **Endpoint**: `GET /api/courses`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "code": "CS101",
      "name": "Introduction to Computer Science",
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Course by ID
- **Endpoint**: `GET /api/courses/:id`
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "code": "CS101",
    "name": "Introduction to Computer Science",
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 4. Update Course
- **Endpoint**: `PUT /api/courses/:id`
- **Request Body**:
```json
{
  "code": "CS102",
  "name": "Advanced Computer Science"
}
```
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "code": "CS102",
    "name": "Advanced Computer Science",
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T11:00:00.000Z"
  }
}
```

### 5. Delete Course
- **Endpoint**: `DELETE /api/courses/:id`
- **Response** (200):
```json
{
  "data": "OK"
}
```

---

## Assignment API

### 1. Create Assignment
- **Endpoint**: `POST /api/assignments`
- **Request Body**:
```json
{
  "title": "Homework 1",
  "description": "Complete chapter 1 exercises",
  "dueDate": "2025-12-15T23:59:59.000Z",
  "courseId": 1
}
```
- **Response** (201):
```json
{
  "data": {
    "id": 1,
    "title": "Homework 1",
    "description": "Complete chapter 1 exercises",
    "dueDate": "2025-12-15T23:59:59.000Z",
    "status": "PENDING",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 2. Get All Assignments
- **Endpoint**: `GET /api/assignments`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "title": "Homework 1",
      "description": "Complete chapter 1 exercises",
      "dueDate": "2025-12-15T23:59:59.000Z",
      "status": "PENDING",
      "courseId": 1,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Assignments by Course
- **Endpoint**: `GET /api/courses/:courseId/assignments`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "title": "Homework 1",
      "description": "Complete chapter 1 exercises",
      "dueDate": "2025-12-15T23:59:59.000Z",
      "status": "PENDING",
      "courseId": 1,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 4. Get Assignment by ID
- **Endpoint**: `GET /api/assignments/:id`
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "title": "Homework 1",
    "description": "Complete chapter 1 exercises",
    "dueDate": "2025-12-15T23:59:59.000Z",
    "status": "PENDING",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 5. Update Assignment
- **Endpoint**: `PUT /api/assignments/:id`
- **Request Body**:
```json
{
  "title": "Homework 1 - Updated",
  "status": "DONE"
}
```
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "title": "Homework 1 - Updated",
    "description": "Complete chapter 1 exercises",
    "dueDate": "2025-12-15T23:59:59.000Z",
    "status": "DONE",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T11:00:00.000Z"
  }
}
```

### 6. Delete Assignment
- **Endpoint**: `DELETE /api/assignments/:id`
- **Response** (200):
```json
{
  "data": "OK"
}
```

---

## Schedule API

### 1. Create Schedule
- **Endpoint**: `POST /api/schedules`
- **Request Body**:
```json
{
  "day": "Monday",
  "startTime": "09:00",
  "endTime": "11:00",
  "courseId": 1
}
```
- **Response** (201):
```json
{
  "data": {
    "id": 1,
    "day": "Monday",
    "startTime": "09:00",
    "endTime": "11:00",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 2. Get All Schedules
- **Endpoint**: `GET /api/schedules`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "11:00",
      "courseId": 1,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Schedules by Course
- **Endpoint**: `GET /api/courses/:courseId/schedules`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "11:00",
      "courseId": 1,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 4. Get Schedule by ID
- **Endpoint**: `GET /api/schedules/:id`
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "day": "Monday",
    "startTime": "09:00",
    "endTime": "11:00",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 5. Update Schedule
- **Endpoint**: `PUT /api/schedules/:id`
- **Request Body**:
```json
{
  "day": "Tuesday",
  "startTime": "10:00",
  "endTime": "12:00"
}
```
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "day": "Tuesday",
    "startTime": "10:00",
    "endTime": "12:00",
    "courseId": 1,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T11:00:00.000Z"
  }
}
```

### 6. Delete Schedule
- **Endpoint**: `DELETE /api/schedules/:id`
- **Response** (200):
```json
{
  "data": "OK"
}
```

---

## Daily Study API

### 1. Create Daily Study
- **Endpoint**: `POST /api/daily-studies`
- **Request Body**:
```json
{
  "title": "Study Session 1",
  "description": "Reviewed algorithms",
  "date": "2025-12-06T14:00:00.000Z",
  "duration": 120
}
```
- **Response** (201):
```json
{
  "data": {
    "id": 1,
    "title": "Study Session 1",
    "description": "Reviewed algorithms",
    "date": "2025-12-06T14:00:00.000Z",
    "duration": 120,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 2. Get All Daily Studies
- **Endpoint**: `GET /api/daily-studies`
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "title": "Study Session 1",
      "description": "Reviewed algorithms",
      "date": "2025-12-06T14:00:00.000Z",
      "duration": 120,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Daily Studies by Date Range
- **Endpoint**: `GET /api/daily-studies/range?startDate=2025-12-01&endDate=2025-12-31`
- **Query Parameters**:
  - `startDate`: Start date (ISO 8601 format)
  - `endDate`: End date (ISO 8601 format)
- **Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "title": "Study Session 1",
      "description": "Reviewed algorithms",
      "date": "2025-12-06T14:00:00.000Z",
      "duration": 120,
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

### 4. Get Daily Study by ID
- **Endpoint**: `GET /api/daily-studies/:id`
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "title": "Study Session 1",
    "description": "Reviewed algorithms",
    "date": "2025-12-06T14:00:00.000Z",
    "duration": 120,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

### 5. Update Daily Study
- **Endpoint**: `PUT /api/daily-studies/:id`
- **Request Body**:
```json
{
  "title": "Study Session 1 - Updated",
  "duration": 150
}
```
- **Response** (200):
```json
{
  "data": {
    "id": 1,
    "title": "Study Session 1 - Updated",
    "description": "Reviewed algorithms",
    "date": "2025-12-06T14:00:00.000Z",
    "duration": 150,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T11:00:00.000Z"
  }
}
```

### 6. Delete Daily Study
- **Endpoint**: `DELETE /api/daily-studies/:id`
- **Response** (200):
```json
{
  "data": "OK"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": "Validation error message"
}
```

### 404 Not Found
```json
{
  "errors": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "errors": "Internal server error"
}
```

---

## Data Types

### AssignmentStatus
- `PENDING`: Assignment not yet completed
- `DONE`: Assignment completed
- `LATE`: Assignment completed after due date

### Time Format
- Time fields use 24-hour format: `HH:MM` (e.g., "09:00", "14:30")

### Date Format
- Date fields use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

### Duration
- Duration is measured in minutes (integer)
