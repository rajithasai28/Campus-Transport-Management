import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  sequence: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
}, { timestamps: true });
schema.index({ route: 1, sequence: 1 }, { unique: true });
export default mongoose.model("Stop", schema);
