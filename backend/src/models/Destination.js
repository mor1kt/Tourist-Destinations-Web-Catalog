import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, required: true, trim: true, minlength: 10 },
    country: { type: String, required: true, trim: true },
    images: [{ type: String, trim: true }],
    rating: { type: Number, min: 0, max: 5, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
