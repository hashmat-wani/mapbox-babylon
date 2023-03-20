import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
