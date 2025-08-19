# Fullstack User Management System - Frontend

## Overview
This is the frontend for the Fullstack User Management System with RBAC. It is built using plain HTML, CSS, and JavaScript.

**Features:**
- User registration and login
- Role-based dashboard:
  - Admin: view users, manage resources
  - Moderator: manage resources
  - User: view resources, update profile
- CRUD operations on resources
- Protected routes using JWT
- Dynamic error and success messages

---

## Tech Stack
- HTML / CSS / JavaScript
- Fetch API for backend integration
- JWT-based authentication

---

## Folder Structure
Frontend/
│
├─ index.html # Login page
├─ register.html # Registration page
├─ dashboard.html # Dashboard (role-based)
├─ profile.html # User profile page
├─ resources.html # Resource management page
│
├─ css/
│ └─ styles.css
│
└─ js/
├─ auth.js # Login & Register
├─ dashboard.js # Role-based dashboard logic
└─ resources.js # Resource CRUD logic


Live URL
Frontend: https://sanjayasokan.github.io/User-management-frontend/

GitHub Repo
Link: https://github.com/SanjayAsokan/User-management-frontend
