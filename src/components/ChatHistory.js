// src/components/ChatHistory.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chat/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/chat/history");
      setHistory([]); // Clear UI also
    } catch (err) {
      console.error("Error deleting history:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl mt-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">📝 Chat History</h2>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaTrashAlt />
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">No chat history found.</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {history.map((chat) => (
            <li
              key={chat._id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <p className="text-gray-700">
                <span className="font-semibold">You:</span> {chat.userMessage}
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Bot:</span>{" "}
                {chat.botResponse?.remedy}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(chat.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
