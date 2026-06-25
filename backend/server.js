require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");


const User = require("./models/User");
const generateOTP = require("./utils/otp");
const sendOTPEmail = require("./utils/sendEmail");

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
  console.log({ name: req.body.name, email: req.body.email });
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

    // generate OTP and hash it too (same idea as hashing the password)
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiry
    });

    await newUser.save();

    console.log("User saved successfully, sending OTP");

    await sendOTPEmail(email, otp);

    res.json({
      message: "OTP sent to email",
      email: newUser.email
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error saving user"
    });
  }
});

// VERIFY OTP
app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired. Please request a new one" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // log them in immediately after verifying, same as a normal login
    const token = jwt.sign(
      { userID: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Email verified successfully",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
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
