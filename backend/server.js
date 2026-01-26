import cors from "cors";

app.use(
  cors({
    origin: "*", // Allow Cloudflare Pages frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
