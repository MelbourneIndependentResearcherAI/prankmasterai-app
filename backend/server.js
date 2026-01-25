import express from "express";
import cors from "cors";
import messageRoute from "./routes/message.js";
import healthRoute from "./routes/health.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check route
app.use("/", healthRoute);

// Message route
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
