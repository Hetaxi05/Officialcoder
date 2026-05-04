const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); // Validation Library
const User = require("../model/ModelUser");
const Activity = require("../model/activity");
const nodemailer = require("nodemailer");

const RouterUser = express.Router();
const JWT_SECRET = "aneri";

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Get all users
RouterUser.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

//   Display Five Records in DB

RouterUser.get("/last-five", async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(5); // Fetch last 5 users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

//User Registration with Validation
RouterUser.post("/register", async (req, res) => {

  const { name, email, password, location } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    // console.log("New user registration:", { name, email, password, location });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Create new user with OTP
    user = new User({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpCreatedAt: new Date(),
      location,
      statusBar: req.body.statusBar !== undefined ? req.body.statusBar : 1
    });

    await user.save();

    //Send email
    await sendMail(email, otp);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    console.log("User registered successfully:", user); //Log successful registration
    // res.json({ message: "Registration successful", token });
    return res.status(200).json({ message: "User created & OTP sent successfully!", token });

  } catch (error) {
    console.error("Registration failed:", error); // Log full error
    res.status(500).json({ message: "Server error", error });
  }
});

// display statusbar of user

RouterUser.put("/:id/status", async (req, res) => {
  try {
    const { statusBar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { statusBar },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Status updated", user });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// update payment status

RouterUser.put("/:id/payment-status", async (req, res) => {
  try {
    const { isPremium } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isPremium },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Payment status updated", user });
  } catch (err) {
    console.error("Payment status update failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// otp

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
   user: "hastimoradiya.bca.clg@gmail.com", // Replace with your email
    pass: "ehubdoqpymmdhasy", // Replace with your email password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send Email Function
async function sendMail(email, otp) {
  const mailOptions = {
    from: "hastimoradiya.bca.clg@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("xEmail sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
}

// Generate and send OTP
RouterUser.post("/send-otp", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

  try {
    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltRounds); // Encrypt OTP

    const user = await User.findOne({ email });
    if (user) {
      await User.updateOne({ email }, { otp: hashedOtp });
      await sendMail(email, otp);
      return res.json({ message: "OTP sent successfully" });
    }

    const record = new User({
      email: req.body["email"],
    });
    record.save()
      .then()
      .catch()

  }
  catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


RouterUser.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await User.findOne({ email });
    if (!record) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare provided OTP with the hashed one in DB
    const isMatch = await bcrypt.compare(otp, record.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP or OTP expired." });
    }

    //OTP is valid → mark email as verified
    record.emailVerify = true;
    await record.save();

    console.log("OTP verified and emailVerify set to true for:", record.email);
    return res
      .status(200)
      .json({ message: "OTP verified successfully.", data: record });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Failed to verify OTP." });
  }
});

// User Login with Validation

RouterUser.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found. Please register first." });
      }

      if (user.emailVerify === false) {
        return res.status(403).json({ message: "Your email is not verify. Please contact admin." });
      }

      if (user.statusBar === 0) {
        return res.status(403).json({ message: "Your account is deactivated. Please contact admin." });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      //tore login activity in DB
      await Activity.create({
        userId: user._id,
        timestamp: new Date(), // optional, since default is already Date.now
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", "user": user });

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// Protected Route Example
RouterUser.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You have access to this protected route!", user: req.user });
});


// Change Password API without token authentication
RouterUser.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Validate required fields
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Email, old password, and new password are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // Hash the new password and update the user's password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// User Update Profile

RouterUser.post("/update-profile", async (req, res) => {
  try {
    const { oldEmail, name, email } = req.body;

    // Find user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email: oldEmail }, // Use old email to find user
      { name, email },     // Update both name and email
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = RouterUser;
