# AgriCare Planner 🚜

AgriCare Planner is a task management web application meticulously designed for small-scale livestock and crop farmers. It provides a simple, intuitive interface to organize, track, and manage daily farming operations, helping to improve productivity and ensure crucial tasks are never forgotten.


---

## ⭐ Core Features

- **Task Creation:** Quickly add farming-related tasks with descriptions and categories.
- **Categorized Dashboard:** View all tasks on a clean, responsive dashboard.
- **Status Tracking:** Mark tasks as completed to track progress.
- **Full CRUD Functionality:** Create, Read, and Delete tasks with ease.

## 🛠️ Tech Stack & Architecture

| Area         | Technology                                |
| :----------- | :---------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, Axios          |
| **Backend**  | Node.js, Express                          |
| **Database** | MongoDB (via MongoDB Atlas)               |
| **DevOps**   | GitHub Actions (CI/CD), Docker, Terraform |
| **Testing**  | Jest, Supertest                           |

## 🚀 Local Development Setup

### Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account.

### Installation Guide

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/Ange-Mukundente/agricare-planner.git
    cd agricare-planner
    ```

2.  **Setup Backend:**

    ```sh
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory. Add your MongoDB Atlas connection string.

    Then, run the backend server:

    ```sh
    npm run dev
    ```

3.  **Setup Frontend (in a new terminal):**

    ```sh
    cd frontend
    npm install
    npm run dev
    ```

    The frontend will be running at `http://localhost:5173`.

    ## 📖 API Documentation

The backend provides a RESTful API for managing tasks. The base URL for all endpoints is `/api/tasks`.

### Create a Task

- **Endpoint:** `POST /api/tasks`
- **Description:** Adds a new task to the database.
- **Request Body (JSON):**
  ```json
  {
    "title": "string (required)",
    "category": "string (required)",
    "description": "string (optional)",
    "dueDate": "Date (optional)"
  }
  ```
- **Success Response:** `201 Created` with the new task object.
- **Error Response:** `400 Bad Request` if required fields are missing.

### Get All Tasks

- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieves a list of all tasks.
- **Success Response:** `200 OK` with an array of task objects.

### Update a Task

- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Updates an existing task by its ID.
- **Request Body (JSON):** An object containing any of the task fields to be updated.
  ```json
  {
    "title": "New title",
    "status": "completed"
  }
  ```
- **Success Response:** `200 OK` with the updated task object.

### Delete a Task

- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Deletes a task by its ID.
- **Success Response:** `204 No Content` with an empty body.

## ⚙️ CI/CD Pipeline

This project utilizes **GitHub Actions** for Continuous Integration. The pipeline automatically triggers on every Pull Request to `develop` and `main` and performs the following:

1.  Installs all dependencies for frontend and backend.
2.  Runs the backend Jest test suite against a live database. This requires a `MONGODB_URI` secret to be configured in the repository settings.
3.  Builds the frontend application to ensure it's free of errors.

Merges into the `main` branch are protected and require all status checks to pass.

## 🐳 Running with Docker

You can run the entire application locally using Docker and Docker Compose.

1.  Ensure you have Docker installed.
2.  From the project root, run:
    ```sh
    docker-compose up --build
    ```
3.  The application will be available at `http://localhost:8080`.
