import express from "express";
import destinationsRoutes from "./routes/destinationsRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/destinations", destinationsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
