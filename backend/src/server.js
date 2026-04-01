import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start();
