import { useState } from "react";
import ChatForm from "./components/ChatForm";
import ChatHistory from "./components/ChatHistory";
import DoctorDashboard from "./DoctorDashboard";

// Mock components for demonstration (remove if you have actual components)
const MockChatForm = () => (
  <div className="chat-form-card">
    <div className="card-header">
      <div className="card-icon chat-icon">💬</div>
      <h2>Chat with HealBot</h2>
    </div>
    <div className="chat-form">
      <textarea 
        className="chat-textarea" 
        placeholder="Describe your symptoms or health concerns..."
      />
      <button className="send-btn">Send Message</button>
    </div>
  </div>
);

const MockChatHistory = () => (
  <div className="chat-history-card">
    <div className="card-header">
      <div className="card-icon history-icon">📈</div>
      <h2>Chat History</h2>
    </div>
    <div className="chat-messages">
      <div className="chat-message patient-message">
        <p><strong>You:</strong> I have been experiencing headaches for the past few days...</p>
        <div className="message-time">2 hours ago</div>
      </div>
      <div className="chat-message bot-message">
        <p><strong>HealBot:</strong> Based on your symptoms, here are some recommendations for managing headaches...</p>
        <div className="message-time">2 hours ago</div>
      </div>
      <div className="chat-message patient-message">
        <p><strong>You:</strong> Thank you for the advice. Should I be concerned?</p>
        <div className="message-time">1 hour ago</div>
      </div>
    </div>
  </div>
);

function App() {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="app-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #F5F5F5 0%, #E7EFC7 50%, #DED8C9 100%);
          min-height: 100vh;
          line-height: 1.6;
          color: #241F14;
        }

        /* Header Styles */
        .app-header {
          background: linear-gradient(135deg, #241F14 0%, #3B3B1A 100%);
          box-shadow: 0 4px 20px rgba(36, 31, 20, 0.15);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #AEC8A4, #E7EFC7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          box-shadow: 0 4px 12px rgba(174, 200, 164, 0.3);
          font-size: 24px;
        }

        .logo-text h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #AEC8A4, #E7EFC7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .logo-text p {
          color: #DED8C9;
          font-size: 0.9rem;
          font-weight: 400;
          margin: 0;
        }

        .toggle-buttons {
          display: flex;
          background: rgba(245, 245, 245, 0.1);
          border-radius: 15px;
          padding: 5px;
          backdrop-filter: blur(10px);
        }

        .toggle-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #AEC8A4, #E7EFC7);
          color: #241F14;
          box-shadow: 0 4px 12px rgba(174, 200, 164, 0.3);
          transform: translateY(-2px);
        }

        .toggle-btn.inactive {
          color: #DED8C9;
          background: transparent;
        }

        .toggle-btn:hover:not(.active) {
          background: rgba(222, 216, 201, 0.1);
          transform: translateY(-1px);
        }

        /* Welcome Section */
        .welcome-section {
          background: linear-gradient(135deg, #3B3B1A, #241F14);
          border-radius: 20px;
          padding: 40px;
          margin: 30px auto;
          color: white;
          box-shadow: 0 8px 32px rgba(36, 31, 20, 0.2);
          max-width: 1200px;
        }

        .welcome-section h2 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .welcome-section p {
          color: #DED8C9;
          font-size: 1.1rem;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }

        .patient-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* Card Styles */
        .chat-form-card,
        .chat-history-card {
          background: rgba(245, 245, 245, 0.9);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(36, 31, 20, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(222, 216, 201, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .chat-form-card:hover,
        .chat-history-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(36, 31, 20, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 18px;
        }

        .chat-icon {
          background: linear-gradient(135deg, #AEC8A4, #E7EFC7);
        }

        .history-icon {
          background: linear-gradient(135deg, #8A784E, #DED8C9);
        }

        .card-header h2 {
          font-size: 1.5rem;
          color: #241F14;
          font-weight: 600;
          margin: 0;
        }

        /* Chat Form Styles */
        .chat-form {
          display: flex;
          flex-direction: column;
        }

        .chat-textarea {
          width: 100%;
          padding: 20px;
          border: 2px solid #DED8C9;
          border-radius: 15px;
          font-size: 1rem;
          resize: none;
          height: 120px;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .chat-textarea:focus {
          outline: none;
          border-color: #AEC8A4;
          box-shadow: 0 0 0 4px rgba(174, 200, 164, 0.1);
        }

        .send-btn {
          padding: 15px;
          background: linear-gradient(135deg, #8A784E, #AEC8A4);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 15px;
          transition: all 0.3s ease;
        }

        .send-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(138, 120, 78, 0.3);
        }

        /* Chat History Styles */
        .chat-messages {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .chat-message {
          padding: 20px;
          border-radius: 15px;
          transition: transform 0.2s ease;
        }

        .chat-message:hover {
          transform: translateX(5px);
        }

        .patient-message {
          background: linear-gradient(135deg, rgba(231, 239, 199, 0.5), rgba(222, 216, 201, 0.3));
          border-left: 4px solid #AEC8A4;
        }

        .bot-message {
          background: linear-gradient(135deg, rgba(174, 200, 164, 0.3), rgba(231, 239, 199, 0.5));
          border-left: 4px solid #8A784E;
        }

        .chat-message p {
          margin: 0;
          line-height: 1.6;
        }

        .message-time {
          font-size: 0.85rem;
          color: #8A784E;
          margin-top: 8px;
        }

        /* Footer */
        .app-footer {
          background: rgba(36, 31, 20, 0.9);
          color: #DED8C9;
          text-align: center;
          padding: 30px 0;
          backdrop-filter: blur(10px);
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .footer-content p {
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 20px;
          }

          .toggle-buttons {
            width: 100%;
            justify-content: center;
          }

          .patient-view {
            grid-template-columns: 1fr;
          }

          .welcome-section {
            padding: 30px 20px;
            margin: 20px;
          }

          .logo-text h1 {
            font-size: 2rem;
          }

          .main-content {
            padding: 0 10px 60px;
          }
        }

        /* Animations */
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .chat-form-card,
        .chat-history-card {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🩺</div>
            <div className="logo-text">
              <h1>HealBot</h1>
              <p>AI-Powered Healthcare Assistant</p>
            </div>
          </div>
          
          <div className="toggle-buttons">
            <button
              onClick={() => setIsDoctor(false)}
              className={`toggle-btn ${!isDoctor ? 'active' : 'inactive'}`}
            >
              👥 Patient View
            </button>
            <button
              onClick={() => setIsDoctor(true)}
              className={`toggle-btn ${isDoctor ? 'active' : 'inactive'}`}
            >
              🩺 Doctor View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>
            {isDoctor ? 'Welcome to Doctor Dashboard' : 'Welcome to Patient Portal'}
          </h2>
          <p>
            {isDoctor 
              ? 'Monitor patient interactions and manage consultations efficiently'
              : 'Get instant medical guidance and track your health journey'
            }
          </p>
        </div>

        {/* Dynamic Content */}
        {isDoctor ? (
          <DoctorDashboard />
        ) : (
          <div className="patient-view">
            {/* Use your actual components or the mock ones */}
            {typeof ChatForm !== 'undefined' ? <ChatForm /> : <MockChatForm />}
            {typeof ChatHistory !== 'undefined' ? <ChatHistory /> : <MockChatHistory />}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <span>🩺</span>
          <p>© 2025 HealBot - AI-Powered Healthcare Assistant</p>
        </div>
      </footer>
    </div>
  );
}

export default App;