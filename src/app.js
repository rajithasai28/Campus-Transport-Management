import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import stopRoutes from "./routes/stopRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({
  success: true,
  message: "Campus Transport Management API is running",
  resources: ["/api/auth", "/api/routes", "/api/stops", "/api/vehicles", "/api/schedules"]
}));
app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
