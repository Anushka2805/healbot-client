import React, { useState } from 'react';
import './Chatbot.css';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAskingDuration, setIsAskingDuration] = useState(false);
  const [pendingSymptom, setPendingSymptom] = useState("");

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Show user's message
    setMessages((prev) => [...prev, { text: trimmedInput, sender: 'user' }]);
    setInput("");

    if (!isAskingDuration) {
      // Step 1: Bot will ask for duration now
      setMessages((prev) => [
        ...prev,
        { text: "Aapko ye symptom kitne din se ho raha hai?", sender: "bot" },
      ]);
      setPendingSymptom(trimmedInput);
      setIsAskingDuration(true);
    } else {
      // Step 2: Send message + duration to backend
      try {
        const res = await axios.post("http://localhost:5000/api/chat", {
          message: pendingSymptom,
          duration: trimmedInput,
        });

        setMessages((prev) => [
          ...prev,
          { text: `Remedy: ${res.data.remedy}`, sender: "bot" },
          { text: `Precaution: ${res.data.precaution}`, sender: "bot" },
          { text: res.data.note, sender: "bot" },
        ]);
      } catch (err) {
        console.error("Backend error:", err);
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, kuch galat ho gaya. Try again later.", sender: "bot" },
        ]);
      }

      // Reset for next chat
      setIsAskingDuration(false);
      setPendingSymptom("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isAskingDuration ? "Duration likhiye (e.g. 2 days)" : "Symptom likhiye (e.g. cough)"}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
