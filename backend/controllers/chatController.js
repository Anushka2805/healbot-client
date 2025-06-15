const Chat = require("../models/Chat");

// ---------------------------
// Handle Chat Route
// ---------------------------
const handleChat = async (req, res) => {
  const { message, duration } = req.body;

  try {
    const symptomMap = {
      cough: {
        remedy: "Drink warm fluids and rest your throat.",
        precaution: "Avoid cold and dusty environments.",
      },
      fever: {
        remedy: "Take paracetamol and stay hydrated.",
        precaution: "Monitor temperature regularly.",
      },
      headache: {
        remedy: "Lie down in a dark room and avoid screens.",
        precaution: "Avoid stress and drink enough water.",
      },
      cold: {
        remedy: "Use steam inhalation and stay warm.",
        precaution: "Avoid cold drinks and sudden temperature changes.",
      },
    };

    const matchedSymptom = message.toLowerCase().trim();
    const data = symptomMap[matchedSymptom] || {
      remedy: "Take rest and stay hydrated.",
      precaution: "Avoid cold drinks.",
    };

    let remedy = data.remedy;
    let precaution = data.precaution;
    let adviseDoctor = false;
    let personalizedMessage = "";

    // Save temp chat entry first
    const tempChat = new Chat({
      userMessage: message,
      duration,
      botResponse: {
        remedy,
        precaution,
        adviseDoctor: false,
        symptom: matchedSymptom,
        note: "Evaluating...",
      },
    });

    await tempChat.save();

    // Check past occurrences (excluding the one just saved)
    const previousRecords = await Chat.find({
      "botResponse.symptom": matchedSymptom,
      _id: { $ne: tempChat._id },
    });

    if (previousRecords.length >= 2) {
      personalizedMessage = "This symptom has occurred multiple times. Please monitor closely.";
      adviseDoctor = true;
    } else if (duration && parseInt(duration) >= 5) {
      personalizedMessage = "You've had this for several days. Consider seeing a doctor.";
      adviseDoctor = true;
    } else {
      personalizedMessage = "Looks like a minor issue. Take care!";
    }

    // Update the temp chat entry with final response
    tempChat.botResponse = {
      remedy,
      precaution,
      adviseDoctor,
      symptom: matchedSymptom,
      note: personalizedMessage,
    };

    await tempChat.save();

    res.json(tempChat.botResponse);
  } catch (error) {
    console.error("Error in handleChat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ---------------------------
// Get Doctor Summary
// ---------------------------
const getSummaryForDoctor = async (req, res) => {
  try {
    const allChats = await Chat.find().sort({ createdAt: -1 }).limit(20);

    const criticalChats = allChats.filter(chat => chat.botResponse.adviseDoctor === true);

    const summary = criticalChats.map(chat => ({
      symptom: chat.botResponse.symptom,
      note: chat.botResponse.note,
      remedy: chat.botResponse.remedy,
      precaution: chat.botResponse.precaution,
      date: chat.createdAt,
    }));

    res.status(200).json({
      message: "Doctor summary generated",
      criticalCases: summary,
    });
  } catch (err) {
    console.error("Error in summary route:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ---------------------------
// Get Chat History
// ---------------------------
const getChatHistory = async (req, res) => {
  try {
    const history = await Chat.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// Clear Chat History
// ---------------------------
const deleteChatHistory = async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: "Chat history cleared" });
  } catch (error) {
    console.error("Error clearing chat history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleChat,
  getSummaryForDoctor,
  getChatHistory,
  deleteChatHistory,
};
