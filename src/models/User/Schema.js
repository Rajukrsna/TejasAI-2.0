import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    username: { type: String },
    email: { type: String, required: true },
    points: { type: Number, default: 0 },
    logActivity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     clerkId: {
//       type: String,
//       required: true, // Optional: Make clerkId a required field if it's mandatory
//     },
//     username: {
//       type: String,
//       required: true, // Optional: Make username a required field if needed
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true, // Optional: Convert email to lowercase for consistency
//     },
//     points: {
//       type: Number,
//       default: 0
//     },
//     logActivity: {
//       type: Boolean,
//       default: false
//     },
//   },
//   { timestamps: true }
// );

// // Indexing for better search performance (if needed)
// userSchema.index({ email: 1 });
// userSchema.index({ clerkId: 1 });

// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;
