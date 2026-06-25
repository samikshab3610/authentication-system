# 🔐 Full-Stack Authentication System

A complete full-stack authentication project with user signup, login, Google OAuth sign-in, Email + OTP verification, and secure password handling using **Node.js, Express, MongoDB, and JWT**.

---

## 🚀 Features

* User Signup & Login
* Password Hashing using bcrypt
* **Continue with Google** — OAuth sign-in via Google Identity Services
* **Email + OTP Verification** — 6-digit code emailed on signup, hashed before storage, with a 10-minute expiry
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
* Google Identity Services (OAuth)

**Backend:**
* Node.js
* Express.js

**Database:**
* MongoDB (Local / Atlas)

**Authentication:**
* bcrypt (password & OTP hashing)
* JSON Web Token (JWT)
* google-auth-library (Google ID token verification)
* nodemailer (sending OTP emails via Gmail)

---

## 📂 Project Structure

```
authentication-system/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── utils/
│   │   ├── otp.js
│   │   └── sendEmail.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── signup.html
│   ├── signup.js
│   ├── login.html
│   ├── login.js
│   ├── verify-otp.html
│   ├── verify-otp.js
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

Create a `.env` file in `backend`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

# Google Cloud Console → APIs & Services → Credentials → OAuth Client ID
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Gmail address + App Password (https://myaccount.google.com/apppasswords)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

You'll also need to paste your `GOOGLE_CLIENT_ID` into the `data-client_id` attribute inside `frontend/signup.html` and `frontend/login.html`.

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

### Signup (sends an OTP email)
```
POST /api/signup
```

### Login
```
POST /api/login
```

### Verify OTP (verifies email, returns a JWT)
```
POST /api/verify-otp
```

### Google Sign-In
```
POST /api/auth/google
```

---

## 🔐 Authentication Flow

**Email + Password:**
1. User signs up → account created in MongoDB as unverified, OTP emailed (hashed before storage)
2. User is redirected to the login page
3. Clicking **"Verify with OTP"** on the signup page opens the verification screen, with the email pre-filled
4. Entering the correct, non-expired code marks the account verified and logs the user in via JWT
5. Token is stored in browser (localStorage); dashboard access is protected using it

**Google Sign-In:**
1. User clicks "Continue with Google" on signup or login
2. Frontend receives a signed ID token from Google
3. Backend verifies the token directly with Google's servers
4. A user is created (or matched, if already registered) and marked verified automatically — Google has already confirmed their email
5. A JWT is issued the same way as the password flow

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

* Block email/password login for unverified accounts
* "Resend OTP" button on the verification page
* Forgot password feature
* Role-based authentication
* Rate-limiting OTP requests/attempts
* Better UI (React / Tailwind)

---

## 👩‍💻 Author
**Samiksha Bhore**

---

## ⭐ If you like this project
Give it a ⭐ on GitHub!
