import express from "express";
import cors from "cors";
import messageRoute from "./routes/message.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("PrankMasterAI backend is running");
});

// Routes
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
