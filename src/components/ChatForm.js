import { useState } from "react";
import axios from "axios";

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      const res = await axios.post("http://localhost:5000/api/chat/chat", {
        message,
        duration
      });

      setResponse(res.data);
      setMessage("");
      setDuration("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">💬 Healbot Chat</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter symptom..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Since how many days?"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Send
        </button>
      </form>

      {response && (
        <div className="mt-4 bg-gray-50 p-4 rounded">
          <p><strong>Symptom:</strong> {response.symptom}</p>
          <p><strong>Remedy:</strong> {response.remedy}</p>
          <p><strong>Precaution:</strong> {response.precaution}</p>
          <p><strong>Doctor Visit Advised:</strong> {response.adviseDoctor ? "Yes" : "No"}</p>
          <p><strong>Note:</strong> {response.note}</p>
        </div>
      )}
    </div>
  );
};

export default ChatForm;
