const express = require("express");
const multer = require("multer");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const upload = multer({ dest: "uploads/" });

// Get token from Render environment variables
const token = process.env.BOT_TOKEN;

if (!token) {
  console.log("BOT_TOKEN is missing!");
}

const bot = new TelegramBot(token);

app.post("/upload", upload.single("photo"), (req, res) => {
  const chatId = req.body.chatId;

  if (!chatId) {
    return res.status(400).send("chatId missing");
  }

  bot.sendPhoto(chatId, req.file.path)
    .then(() => res.send("Photo sent!"))
    .catch(err => res.status(500).send(err.toString()));
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
