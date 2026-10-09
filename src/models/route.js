import mongoose from "mongoose";
const schema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true, trim: true },
  routeName: { type: String, required: true, trim: true },
  startPoint: { type: String, required: true, trim: true },
  endPoint: { type: String, required: true, trim: true },
  distance: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
}, { timestamps: true });
export default mongoose.model("Route", schema);
