import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
