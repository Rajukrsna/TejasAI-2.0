import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
    },
    username: { type: String, unique: true },
    email: { type: String },
    points: { type: Number, default: 0 },
    logActivity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
