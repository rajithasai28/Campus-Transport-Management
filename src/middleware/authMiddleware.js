import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = req.cookies?.token || (header?.startsWith("Bearer ") ? header.slice(7) : null);
    if (!token) return res.status(401).json({ success: false, message: "Please login first" });
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
