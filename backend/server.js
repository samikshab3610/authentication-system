require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("./models/User");

const app = express();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// middleware to read JSON
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  console.log("Request received");
  console.log(req.body);   // 👈 ADD THIS
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    console.log("User saved successfully");

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
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // cheack if user exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // create token
    const token = jwt.sign(
      { userID: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // check if this email already exists in our database
    let user = await User.findOne({ email });

    if (!user) {
      // brand new user — create them
      user = new User({
        name,
        email,
        googleId
      });
      await user.save();
      console.log("New Google user created:", email);
    } else {
      console.log("Existing user logged in via Google:", email);
    }

    // create the same kind of JWT your normal login uses
    const token = jwt.sign(
      { userID: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Google sign-in failed" });
  }
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
