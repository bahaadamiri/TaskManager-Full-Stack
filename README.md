# Task Manager — Full Stack Application

A full-stack **Task Management System** built with:

* **Frontend:** React, TypeScript, Vite, TailwindCSS, Material UI
* **Backend:** Laravel 11 (PHP 8), MySQL
* **Environment:** Docker and Docker Compose

The project allows users to register, log in, and manage tasks (create, edit, delete, and view) through a modern, responsive web interface.



## Features

### Authentication

* User registration and login using email and password.
* Token-based session simulation for persistent authentication.

### Task Management

* Create, edit, delete, and list tasks.
* Each task includes a title, description, and status (`Pending`, `In Progress`, or `Done`).
* Fully responsive UI that adapts to mobile and desktop screens.

### Tech Stack

* **React** for dynamic, component-based frontend development.
* **TypeScript** for type safety and cleaner code.
* **Vite** for fast, modern build tooling.
* **TailwindCSS** for responsive, utility-based styling.
* **Material UI (MUI)** for form components and accessibility.
* **Laravel** for backend API development.
* **MySQL** for structured data storage.
* **Docker & Docker Compose** for containerized environment setup.
* **Axios** for seamless frontend–backend communication.



## Setup Guide

### 1. Start Docker Environment

From the project root:

```bash
docker compose up --build -d
```

This starts:

* Laravel backend on port **8000**
* MySQL database on port **3306**

Check running containers:

```bash
docker compose ps
```

### 2. Backend Setup

Enter the backend container:

```bash
docker compose exec backend bash
cd /var/www/html
```

Install dependencies:

```bash
composer install
```

Run database migrations:

```bash
php artisan migrate
```

Test the backend:

```bash
curl -i http://localhost:8000/api/ping
```

Expected response:

```json
{"pong": true}
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env` inside the `frontend` directory:

```
VITE_API_BASE=http://localhost:8000/api
```

Run the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)



## Usage

### Register

1. Go to the **Register** page.
2. Fill in your name, email, and password.
3. Submit the form to create an account.
4. You’ll be redirected to the **Login** page.

### Login

1. Navigate to the **Login** page.
2. Enter your credentials and click **Sign In**.
3. You’ll be redirected to the **Tasks** page.

### Manage Tasks

1. Add new tasks with a title, description, and status.
2. Edit or delete existing tasks.
3. Tasks update instantly and persist in the database.



## About

This project was developed as part of a full-stack internship assignment.

It demonstrates the ability to:

* Build RESTful APIs using Laravel.
* Containerize applications with Docker.
* Create responsive user interfaces with React, TailwindCSS, and MUI.
* Integrate frontend and backend seamlessly using Axios and REST endpoints.

  PS: Thank you so much for this oppurtinty. I had so much fun working on this as it was a new challenge for me to learn how to use Laravel with PHP. I also learned how to use Docker which I've wanted to do for a long time. Hope you like it :)
