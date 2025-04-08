import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { createChatCompletion } from "./services/openai.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/api/ask-ai", async (req, res) => {
  const { prompt, html, previousPrompt } = req.body;
  if (!prompt) {
    return res.status(400).send({
      ok: false,
      message: "Missing required fields",
    });
  }

  // Set up response headers for streaming
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 始终使用 OpenAI
  await createChatCompletion({ prompt, previousPrompt, html, res });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
