# LMS Prototype

## 📌 Project Overview

This project is a minimal but functional Learning Management System (LMS) prototype built to demonstrate full-stack development skills.

It supports two types of users:

* **Admin**: Can create courses, add lessons, and view system activity logs.
* **Learner**: Can browse courses, view lessons, and track progress.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* Axios for API calls

### Backend

* Python (Flask)
* RESTful API design
* JWT Authentication

### Databases

* **PostgreSQL**: Stores structured data (users, courses, audit logs)
* **MongoDB**: Stores flexible data (lessons, user progress)

### DevOps

* Docker & Docker Compose

---

## ⚙️ Features

### 👨‍💼 Admin

* Login
* Create courses
* Add lessons (text/video)
* View audit logs

### 👨‍🎓 Learner

* Register & login
* Browse course catalog
* View lessons
* Mark lessons as completed
* Track progress (e.g., 3/5 lessons)

---

## 🔐 Authentication & Security

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes for authorized users
* Role-based access control (Admin vs Learner)

---

## 🧾 Audit Logging

All important user actions are logged:

* Course creation
* Lesson creation
* Lesson completion

Each log includes:

* User ID
* Action
* Timestamp

---

## 🗄️ Database Design

### Why PostgreSQL?

Used for structured data requiring relationships and consistency:

* Users
* Courses
* Audit logs

### Why MongoDB?

Used for flexible, nested, and evolving data:

* Lessons (varying content types)
* Progress tracking (dynamic arrays of completed lessons)

---

## 🧩 API Endpoints (Sample)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Courses

* `GET /api/courses`
* `POST /api/courses` (Admin only)

### Lessons

* `POST /api/lessons` (Admin only)
* `GET /api/lessons/:course_id`

### Progress

* `POST /api/progress/complete`
* `GET /api/progress/:course_id`

### Audit Logs

* `GET /api/audit` (Admin only)

---

## 🐳 Running the Project with Docker

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd lms-prototype
```

### 2. Run the application

```bash
docker-compose up --build
```

### 3. Access the app

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

## 🧠 Microservices Design (Concept)

Although implemented as a monolith, the system is structured to support microservices separation:

* **Auth Service** → Handles authentication & users
* **Course Service** → Manages courses
* **Lesson Service** → Handles course content
* **Progress Service** → Tracks user progress
* **Audit Service** → Logs system activity

Each module is separated in the codebase, making it easy to split into independent services.

---

## 🎨 UI/UX Design

Basic UI was implemented with clarity and usability in mind:

* Simple navigation (Navbar)
* Role-based views (Admin vs Learner)
* Clean layout for course browsing and lesson interaction

Wireframes are included in the `/design` folder.

---

## ⚖️ Trade-offs & Decisions

* Used minimal styling to focus on functionality and architecture.
* Used UUIDs for lesson IDs to ensure reliable tracking.
* Kept backend modular to simulate microservices readiness.

---

## 🚀 Future Improvements

* Add quizzes and assessments
* Improve UI with a design system (e.g., Tailwind)
* Add pagination for courses
* Deploy to cloud (AWS / Docker Hub)

---

## 👩‍💻 Author

Developed as part of a technical assessment.

---

## 📬 Submission

GitHub Repository: <your-repo-link>
