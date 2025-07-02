# AgriCare Planner 🚜

AgriCare Planner is a task management web app tailored for small-scale livestock and crop farmers. It enables users to organize daily farming tasks like feeding schedules, planting, and vaccination dates.

**Live Demo URL:** [Link to be added after deployment in a later phase]

## ⭐ Core Features

- **Create & Manage Tasks:** Easily add, update, and delete farming tasks.
- **Categorized Dashboard:** View tasks organized by categories like 'Livestock' or 'Crops'.
- **Status Tracking:** Mark tasks as completed to track your progress.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **DevOps:** GitHub Actions (CI), Jest, Supertest

## 🚀 Local Development Setup

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn
- A running MongoDB instance (local or a free Atlas cluster)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/<your-username>/agricare-planner.git
    cd agricare-planner
    ```

2.  **Setup Backend:**

    ```sh
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    ```
    MONGODB_URI=your_mongodb_connection_string
    ```

    Then, run the backend server:

    ```sh
    npm run dev
    ```

    The backend will be running on `http://localhost:3001`.

3.  **Setup Frontend (in a new terminal):**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

## CI Pipeline

This project uses GitHub Actions for Continuous Integration. The pipeline automatically runs on every Pull Request to `develop` and `main` to:

1.  Install dependencies for both frontend and backend.
2.  Run all backend unit tests using Jest.
3.  Ensure the frontend application can be successfully built.

Merges to the `main` branch are protected and require all status checks to pass.
