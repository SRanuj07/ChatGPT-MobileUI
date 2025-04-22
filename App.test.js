import React, { useState, useRef } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react"; // Make sure it's installed
import "./App.css"; // Optional if you’re using Tailwind classes

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistories, setChatHistories] = useState(["History 1", "History 2"]);
  const [activeHistory, setActiveHistory] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleDarkMode = () => setDarkMode((prev) => !prev); 

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, type: "user" }]);
    setInput("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMessages([...messages, { image: imageUrl, type: "user" }]);
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* This is just for test verification */}
      <p>Tailwind CSS is working</p>

      <header className="chat-header">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <FaBars />
        </button>
        <h1>ChatGPT</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      {showSidebar && (
        <aside className="sidebar">
          <button onClick={() => setShowSidebar(false)}>
            <FaTimes />
          </button>
          <ul className="history-list">
            {chatHistories.map((history, index) => (
              <li key={index} onClick={() => setActiveHistory(history)}>
                {history}
              </li>
            ))}
          </ul>
        </aside>
      )}

      <main className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text && <p>{msg.text}</p>}
            {msg.image && <img src={msg.image} alt="User upload" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-input p-2 border-top d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control flex-grow-1"
          placeholder="Message ChatGPT"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FaSmile />
        </button>
        {showEmojiPicker && (
          <div className="px-2 mb-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme={darkMode ? "dark" : "light"} />
          </div>
        )}
        <button className="btn-icon" onClick={handleImageUpload}>
          <FaPlus />
        </button>
        <button className="btn-icon">
          <FaMicrophone />
        </button>
        <button className="btn btn-light d-flex justify-content-center align-items-center rounded-circle" onClick={handleSend}>
          <FaPaperPlane size={18} />
        </button>
      </footer>
    </div>
  );
}

export default App;