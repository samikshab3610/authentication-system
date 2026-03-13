const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();

// middleware to read JSON
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://samikshabhore7636_db_user:fBTjcQRYHOW1aPCu@cluster0.j7s1whx.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      message: "User saved to database"
    });
  } catch (error) {
    res.status(500).json({
      error: "Error saving user"
    });
  }
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
