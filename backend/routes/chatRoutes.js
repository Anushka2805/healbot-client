const express = require("express");
const router = express.Router();
const {
  handleChat,
  getChatHistory,
  deleteChatHistory,
  getSummaryForDoctor
} = require("../controllers/chatController");

// Chat routes
router.post("/chat", handleChat);
router.get("/history", getChatHistory); // ✅ Add this
router.delete("/history", deleteChatHistory); // ✅ For clear history
router.get("/summary", getSummaryForDoctor);

module.exports = router;
