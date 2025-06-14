const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
    },
    botResponse: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ important: this auto-adds createdAt and updatedAt
  }
);

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
