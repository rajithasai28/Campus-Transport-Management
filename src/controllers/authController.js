import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function issueToken(user, res) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 86400000 });
}
function safeUser(user) { return { id: user._id, name: user.name, email: user.email, role: user.role }; }

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: "Name, email, and password are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    const user = await User.create({ name: name.trim(), email: email.trim().toLowerCase(), password: await bcrypt.hash(password, 10) });
    res.status(201).json({ message: "Registration successful", user: safeUser(user) });
  } catch (e) { next(e); }
}

// For a classroom demo only: restrict this endpoint before public deployment.
export async function registerAdmin(req, res, next) {
  try {
    const { name, email, password, adminSecret } = req.body;
    if (!process.env.ADMIN_REGISTRATION_SECRET || adminSecret !== process.env.ADMIN_REGISTRATION_SECRET) {
      return res.status(403).json({ message: "Valid admin registration secret required" });
    }
    if (!name?.trim() || !email?.trim() || !password) 
      return res.status(400).json({ message: "Name, email, and password are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    const user = await User.create({ name: name.trim(), email: email.trim().toLowerCase(), password: await bcrypt.hash(password, 10), role: "ADMIN" });
    res.status(201).json({ message: "Admin registered successfully", user: safeUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const existingToken = req.cookies?.token;

    if (existingToken) {
      try {
        const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);
        return res.status(200).json({
          message: "Already logged in",
          user: { id: decoded.id, role: decoded.role }
        });
      } catch {
        // Invalid or expired token; continue with login.
      }
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    issueToken(user, res);

    res.status(200).json({
      message: "Login successful",
      user: safeUser(user)
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
  res.json({ message: "Logout successful" });
}
export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: safeUser(user) });
  } catch (e) { next(e); }
}
