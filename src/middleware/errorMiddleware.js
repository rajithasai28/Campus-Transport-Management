export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Endpoint not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: "Validation failed", errors: Object.values(err.errors).map(e => e.message) });
  }
  if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid resource ID" });
  if (err.code === 11000) return res.status(409).json({ success: false, message: "A record with this unique value already exists" });
  const status = err.statusCode || 500;
  res.status(status).json({ success: false, message: status === 500 ? "Internal server error" : err.message });
}
