# 💼 Job Portal (Full Stack)

A modern full-stack **Job Portal Web Application** built using React, TypeScript, Spring Boot, and MongoDB.
This platform allows users to search and apply for jobs, while employers can post and manage job listings.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* JWT Authentication & Authorization
* Browse and search jobs
* Apply for jobs
* Forgot Password with OTP verification
* Dark Mode / Light Mode toggle 🌙☀️

### 🏢 Employer Features

* Post new job listings
* Edit/Delete jobs
* View applicants

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js
* TypeScript
* Tailwind CSS

### ⚙️ Backend

* Java Spring Boot
* REST APIs
* JWT Authentication

### 🗄️ Database

* MongoDB

---

## 📁 Project Structure

```
JOB-Portal/
│
├── frontend/        # React + TypeScript + Tailwind
├── backend/         # Spring Boot API
├── README.md
```

---

## 🔐 Authentication

* Secure login using **JWT (JSON Web Token)**
* Protected routes for users and employers
* Token-based session management

---

## 🔑 Forgot Password Flow

1. User enters registered email
2. OTP is sent to email
3. User verifies OTP
4. User sets new password securely

---

## 🌙 Theme Support

* Dark Mode and Light Mode toggle
* Built using Tailwind CSS
* Saves user preference

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/your-repo.git
cd JOB-Portal
```

---

### 2️⃣ Backend Setup (Spring Boot)

* Open in IDE (Eclipse/IntelliJ)
* Configure MongoDB connection
* Run Spring Boot application

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:8080
```

### Backend (application.properties)

```
spring.data.mongodb.uri=mongodb://localhost:27017/jobportal
jwt.secret=your_secret_key
```

---

## 📸 Screenshots

(Add your UI screenshots here)

---

## 🤝 Contributing

Feel free to fork this repository and contribute by submitting a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Sunil Sharma**

* BCA Student
* Full Stack Developer 🚀

---
