import User from "../models/User.js";
import Destination from "../models/Destination.js";

export async function getAdminStats(req, res) {
  try {
    const [usersCount, destinationsCount] = await Promise.all([
      User.countDocuments(),
      Destination.countDocuments()
    ]);

    res.json({ usersCount, destinationsCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}
