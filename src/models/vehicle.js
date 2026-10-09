import mongoose from "mongoose";
const schema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true, trim: true, uppercase: true },
  vehicleType: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true, min: 1 },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", default: null },
  status: { type: String, enum: ["ACTIVE", "INACTIVE", "MAINTENANCE"], default: "ACTIVE" }
}, { timestamps: true });
export default mongoose.model("Vehicle", schema);
