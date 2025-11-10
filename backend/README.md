# Backend Developer Intern Assignment

# Developer
**Name:** Mayenk Chanore 
**Role:** Backend Developer Intern (Assignment Submission)

---

# Project Overview
A scalable REST API with Authentication, Role-Based Access, and CRUD functionality for managing tasks.  
It includes a React.js frontend for interacting with the backend APIs.

---

# Tech Stack
- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT + bcrypt.js  
- Frontend: React.js  
- API Testing: Postman  
- Documentation: Postman Collection  

---

# Features
 User Registration & Login  
 Password Hashing (bcrypt)  
 JWT Authentication  
 Role-Based Access (admin/user)  
 Task CRUD APIs  
 Protected Routes  
 Input Validation  
 React UI Integration  
 Toast Notifications  
 Logout Functionality  

---

# Scalability Notes
- Modular MVC Architecture → easy feature expansion  
- Stateless JWT Authentication → scalable horizontally  
- Database indexing possible for faster queries  
- Future-ready for Docker & microservices setup  
- Redis cache can be added for performance boost  
- Deployed easily on **Render (backend)** and **Vercel (frontend)**  

---

# API Endpoints

# Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login and get JWT token |

# Task Routes (Protected)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/v1/tasks` | Create task |
| GET | `/api/v1/tasks` | Get all tasks |
| PUT | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

---

# How to Run Locally

# Backend
```bash
cd backend
npm install
npm run dev


