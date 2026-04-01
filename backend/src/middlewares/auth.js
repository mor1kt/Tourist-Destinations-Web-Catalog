import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("role");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = { id: payload.sub, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
