const express = require("express");

const app = express();

// middleware to read JSON
app.use(express.json());

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  res.status(201).json({
    message: "Signup successful",
    user: {
      name,
      email,
    },
  });
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  res.json({
    message: "Login successful",
    email,
  });
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
