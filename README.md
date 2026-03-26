# 🔐 Full-Stack Authentication System

A complete full-stack authentication project with user signup, login, and secure password handling using **Node.js, Express, MongoDB, and JWT**.

---

## 🚀 Features

* User Signup
* User Login
* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Dashboard (only accessible after login)
* Clean UI with responsive design
* Show/Hide Password 👁️ feature
* Form validation & error handling

---

## 🛠️ Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Local / Atlas)

**Authentication:**

* bcrypt (password hashing)
* JSON Web Token (JWT)

---

## 📂 Project Structure

```
authentication-system/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── signup.html
│   ├── login.html
│   ├── dashboard.html
│   └── style.css
│
├── images/
│   ├── Signup.png
│   ├── Login.png
│   ├── Dashboard.png
│   └── MongoDB.png
│
└── README.md


```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/authentication-system.git
cd authentication-system
```

---

### 2. Install backend dependencies

```bash
cd backend
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

### 4. Run the backend server

```bash
node server.js
```

---

### 5. Run frontend

* Open `frontend` folder
* Right-click `signup.html`
* Click **"Open with Live Server"**

---

## 🔑 API Endpoints

### Signup

```
POST /api/signup
```

### Login

```
POST /api/login
```

---

## 🔐 Authentication Flow

1. User signs up → data stored in MongoDB
2. Password is hashed using bcrypt
3. User logs in → JWT token is generated
4. Token is stored in browser (localStorage)
5. Dashboard access is protected using token

---

## 📸 Screenshots

### Signup Page
![Signup](images/Signup.png)

### Login Page
![Login](images/Login.png)

### Dashboard
![Dashboard](images/Dashboard.png)

### MongoDB Data
![MongoDB](images/MongoDB.png)

---

## 📌 Future Improvements

* Email validation
* Forgot password feature
* Role-based authentication
* Better UI (React / Tailwind)

---

## 👩‍💻 Author

**Samiksha Bhore**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
