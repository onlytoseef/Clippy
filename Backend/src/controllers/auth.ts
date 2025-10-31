import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/sendEmail";


export const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { firstName = "", lastName = "", email = "", password = "" } = req.body;

  const name = `${firstName} ${lastName}`.trim();

  // 1️⃣ Prevent duplicate email
  const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existingUser.rows.length > 0) {
    throw new ApiError(400, "Admin with this email already exists");
  }

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Create new admin
  const result = await pool.query(
    `INSERT INTO users (user_type, email, password, name, status, is_verified)
     VALUES ('admin', $1, $2, $3, 'active', true)
     RETURNING id, user_type, email, name`,
    [email, hashedPassword, name]
  );

  const newAdmin = result.rows[0];

  res.status(201).json(
    new ApiResponse(true, "Admin registered successfully", newAdmin)
  );
});

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1️⃣ Find admin
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND user_type = 'admin'",
    [email]
  );
  if (result.rows.length === 0) throw new ApiError(400, "Admin not found");

  const admin = result.rows[0];

  // 2️⃣ Verify password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new ApiError(400, "Invalid password");


  // 4️⃣ Generate JWT
  const token = jwt.sign(
    { id: admin.id, userType: admin.user_type },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.cookie("auth_token_x", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  delete admin.password;

  res.status(200).json(new ApiResponse(true, "Admin login successful", {
    admin,
    token
  }));
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    user_type = "",
    firstName = "",
    lastName = "",
    email = "",
    password = "",
  } = req.body;

  // Validate Gmail-only emails
  if (!email.endsWith("@gmail.com")) {
    throw new ApiError(400, "Only Gmail addresses are allowed");
  }

  const name = `${firstName} ${lastName}`.trim();

  const ipAddress =
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket.remoteAddress;

  // Check if already registered in main users table
  const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existingUser.rows.length > 0) {
    throw new ApiError(400, "User already exists and verified");
  }

  // Check if already in pending_users
  const existingPending = await pool.query("SELECT * FROM pending_users WHERE email = $1", [email]);
  if (existingPending.rows.length > 0) {
    // Delete old pending record
    await pool.query("DELETE FROM pending_users WHERE email = $1", [email]);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Store in pending_users table (NOT in main users table)
  const result = await pool.query(
    `INSERT INTO pending_users (user_type, email, password, plain_password, name, ip_address, verification_code, verification_expiry)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, email, name`,
    [user_type, email, hashedPassword, password, name, ipAddress, verificationCode, verificationExpiry]
  );

  const pendingUser = result.rows[0];

  // Send verification email (NO password for security)
  await sendVerificationEmail(email, verificationCode, name);

  return res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "Verification code sent to your email. Please verify to complete registration.",
        {
          email: pendingUser.email,
          message: "Check your email for verification code and password"
        }
      ));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, user_type } = req.body;

  // Validate Gmail-only emails
  if (!email.endsWith("@gmail.com")) {
    throw new ApiError(400, "Only Gmail addresses are allowed");
  }

  const ip_address =
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket.remoteAddress;

  // 1. Find user
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND user_type = $2",
    [email, user_type]
  );
  if (result.rows.length === 0) throw new ApiError(400, "User not found");

  const user = result.rows[0];

  // 2. Check if user is blocked
  if (user.status === "blocked") {
    throw new ApiError(403, "Your account has been blocked. Please contact support.");
  }

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid password");

  // 4. Check IP address match (optional - can be removed if not needed)
  // if (user.ip_address && user.ip_address !== ip_address) {
  //   throw new ApiError(403, "You can only log in from your registered device.");
  // }

  // 5. Check if user has an active subscription
  const subscriptionResult = await pool.query(
    `SELECT * FROM subscriptions 
     WHERE user_id = $1 AND status = 'active' AND end_date > NOW()
     LIMIT 1`,
    [user.id]
  );

  const hasActiveSubscription = subscriptionResult.rows.length > 0;

  // 7. Generate JWT
  const token = jwt.sign(
    { id: user.id, userType: user.user_type },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.cookie("auth_token_x", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  delete user.password;

  res.status(200).json(new ApiResponse(true, "Login successful", {
    user,
    token,
    hasActiveSubscription,
    redirectTo: hasActiveSubscription ? "/dashboard" : "/pricing"
  }));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("auth_token_x");
  res.status(200).json(new ApiResponse(true, "Logout successful"));
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;

  console.log("🔍 Verification request received:", { email, code });

  if (!email || !code) {
    console.error("❌ Missing email or code:", { email, code });
    throw new ApiError(400, "Email and verification code are required");
  }

  // Check in pending_users table
  const pendingResult = await pool.query("SELECT * FROM pending_users WHERE email = $1", [email]);
  
  if (pendingResult.rows.length === 0) {
    console.error("❌ No pending user found for:", email);
    throw new ApiError(400, "No pending registration found for this email");
  }

  const pendingUser = pendingResult.rows[0];
  console.log("✅ Found pending user:", pendingUser.email);

  // Verify code
  if (pendingUser.verification_code !== code) {
    console.error("❌ Invalid code. Expected:", pendingUser.verification_code, "Got:", code);
    throw new ApiError(400, "Invalid verification code");
  }

  // Check expiry
  if (new Date(pendingUser.verification_expiry) < new Date()) {
    throw new ApiError(400, "Verification code expired. Please register again.");
  }

  // Move user from pending_users to users table
  const insertResult = await pool.query(
    `INSERT INTO users (user_type, email, password, name, ip_address, is_verified, status)
     VALUES ($1, $2, $3, $4, $5, true, 'active')
     RETURNING id, user_type, email, name, created_at`,
    [
      pendingUser.user_type,
      pendingUser.email,
      pendingUser.password,
      pendingUser.name,
      pendingUser.ip_address
    ]
  );

  const newUser = insertResult.rows[0];

  // Delete from pending_users
  await pool.query("DELETE FROM pending_users WHERE email = $1", [email]);

  // Generate JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, userType: newUser.user_type },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // Send cookie
  res.cookie("auth_token_x", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json(new ApiResponse(true, "Email verified successfully! Account created.", {
      user: newUser,
      token
    }));
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // Check if in pending_users table
  const pendingResult = await pool.query("SELECT * FROM pending_users WHERE email = $1", [email]);
  
  if (pendingResult.rows.length === 0) {
    throw new ApiError(400, "No pending registration found. Please sign up again.");
  }

  const pendingUser = pendingResult.rows[0];

  // Generate new verification code + expiry
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000);

  // Update pending_users table
  await pool.query(
    `UPDATE pending_users SET verification_code = $1, verification_expiry = $2 WHERE email = $3`,
    [verificationCode, verificationExpiry, email]
  );

  // Send email (NO password for security)
  await sendVerificationEmail(email, verificationCode, pendingUser.name);

  return res.json(
    new ApiResponse(true, "Verification code resent successfully", { email })
  );
});

export const getCurrentUser = asyncHandler(async (req: any, res: Response) => {
  const result = await pool.query(
    `
    SELECT 
      u.id,
      u.user_type,
      u.email,
      u.name,
      u.phone,
      u.address,
      u.status,
      u.created_at,
      u.updated_at,

      -- Plan info (from active subscription, if exists)
      p.id AS plan_id,
      p.name AS plan_name,
      p.price AS plan_price,
      s.status AS subscription_status,
      s.start_date,
      s.end_date,
      s.used_script_chars,
      s.used_voice_credits,
      s.used_image_credits,
      s.used_video_credits

    FROM users u
    LEFT JOIN subscriptions s 
      ON s.user_id = u.id AND s.status = 'active'
    LEFT JOIN plans p 
      ON s.plan_id = p.id
    WHERE u.id = $1
    LIMIT 1;
    `,
    [req.user.id]
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "User not found");
  }

  const user = result.rows[0];

  const response = {
    id: user.id,
    user_type: user.user_type,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    plan: user.plan_id
      ? {
          id: user.plan_id,
          name: user.plan_name,
          price: user.plan_price,
          subscription_status: user.subscription_status,
          start_date: user.start_date,
          end_date: user.end_date,
          used_credits: {
            script: user.used_script_chars,
            voice: user.used_voice_credits,
            image: user.used_image_credits,
            video: user.used_video_credits,
          },
        }
      : null,
  };

  res
    .status(200)
    .json(new ApiResponse(true, "Current user fetched successfully", response));
});

export const updateUser = asyncHandler(async (req: any, res: Response) => {
  const { name, phone, address } = req.body;

  const result = await pool.query(
    `UPDATE users SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *`,
    [name, phone, address, req.user.id]
  );

  const user = result.rows[0];

  res
    .status(200)
    .json(new ApiResponse(true, "User updated successfully", user));
});

// ========== FORGOT PASSWORD ==========
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(new ApiResponse(false, "Email is required"));
  }

  // Validate Gmail-only emails
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json(new ApiResponse(false, "Only Gmail addresses are allowed"));
  }

  // Check if user exists
  const userResult = await pool.query(
    `SELECT id, name, email FROM users WHERE email = $1`,
    [email]
  );

  if (userResult.rows.length === 0) {
    return res.status(404).json(new ApiResponse(false, "User not found with this email"));
  }

  const user = userResult.rows[0];

  // Generate 6-digit code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Store reset code in database
  await pool.query(
    `INSERT INTO password_reset_codes (email, code, expires_at) VALUES ($1, $2, $3)`,
    [email, resetCode, expiresAt]
  );

  // Send email with reset code
  await sendPasswordResetEmail(email, resetCode, user.name);

  return res.json(
    new ApiResponse(true, "Password reset code sent to your email", { email })
  );
});

// ========== RESET PASSWORD ==========
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json(
      new ApiResponse(false, "Email, code, and new password are required")
    );
  }

  // Validate Gmail-only emails
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json(new ApiResponse(false, "Only Gmail addresses are allowed"));
  }

  // Validate password length
  if (newPassword.length < 8) {
    return res.status(400).json(
      new ApiResponse(false, "Password must be at least 8 characters")
    );
  }

  // Check if code exists and is valid
  const codeResult = await pool.query(
    `SELECT * FROM password_reset_codes 
     WHERE email = $1 AND code = $2 AND used = FALSE AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [email, code]
  );

  if (codeResult.rows.length === 0) {
    return res.status(400).json(
      new ApiResponse(false, "Invalid or expired reset code")
    );
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await pool.query(
    `UPDATE users SET password = $1, updated_at = NOW() WHERE email = $2`,
    [hashedPassword, email]
  );

  // Mark code as used
  await pool.query(
    `UPDATE password_reset_codes SET used = TRUE WHERE email = $1 AND code = $2`,
    [email, code]
  );

  return res.json(
    new ApiResponse(true, "Password reset successfully")
  );
});





