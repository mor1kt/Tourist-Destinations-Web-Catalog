import cloudinary from "../config/cloudinary.js";

export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "tourist-destinations"
    });

    return res.status(201).json({ url: result.secure_url });
  } catch (error) {
    return res.status(500).json({ message: "Failed to upload image" });
  }
}
