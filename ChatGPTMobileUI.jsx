import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaPaperPlane,
  FaSmile,
  FaMicrophone,
  FaPlus,
  FaRegUserCircle,
  FaTimes,
  FaMoon,
  FaSun,
  FaGlobe,
  FaLightbulb,
} from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import "./ChatGPTMobileUI.css";

const ChatGPTMobileUI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeHistory, setActiveHistory] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setMessages([...messages, { type: "user", image: imageURL, text: "" }]);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const chatHistories = [
    "Trip to Manali",
    "Resume Help",
    "ReactJS Project Ideas",
    "Prepare for Interview",
  ];

  return (
    <div
      className={`chatgpt-mobile d-flex flex-column ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* 🔝 Header */}
      <div
        className={`d-flex justify-content-between align-items-center p-2 border-bottom ${
          darkMode ? "border-secondary bg-black" : "border-dark bg-white"
        }`}
      >
        <FaBars
          size={22}
          className="me-2"
          onClick={() => setShowSidebar(true)}
          style={{ cursor: "pointer" }}
        />
        <button className="btn btn-dark border rounded-pill px-3 py-1 fw-bold">
          Get Plus <span className="ms-1">✨</span>
        </button>
        <FaRegUserCircle size={22} />
      </div>

      {/* 🍔 Sidebar */}
      {showSidebar && (
        <>
          <div
            className={`sidebar slide-in d-flex flex-column ${
              darkMode ? "bg-black text-white" : "bg-white text-dark"
            } position-fixed top-0 start-0 h-100`}
            style={{ width: "250px", zIndex: 1050 }}
          >
            <div className="sidebar-header p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Menu</h6>
              <FaTimes
                size={18}
                onClick={() => setShowSidebar(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="sidebar-history p-3 flex-grow-1 overflow-auto">
              <h6 className="mb-2">Chat History</h6>
              {chatHistories.map((title, idx) => (
                <button
                  key={idx}
                  className={`sidebar-btn w-100 text-start mb-1 ${
                    activeHistory === idx ? "active-history" : ""
                  }`}
                  onClick={() => setActiveHistory(idx)}
                >
                  {title}
                </button>
              ))}
            </div>

            <div className="p-3 border-top border-secondary">
              <button className="sidebar-btn w-100 text-start mb-1">
                My Account
              </button>
              <button className="sidebar-btn w-100 text-start mb-1">
                Upgrade
              </button>
              <button className="sidebar-btn w-100 text-start mb-1">
                Settings
              </button>
              <button className="sidebar-btn w-100 text-start mb-2">
                Logout
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={toggleDarkMode}
              >
                {darkMode ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setShowSidebar(false)}
          ></div>
        </>
      )}

      {/* 💡 Suggestions (Center only if no messages) */}
      {messages.length === 0 && (
        <div className="text-center my-auto px-3">
          <h5 className="mb-4">What can I help with?</h5>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button className="suggestion-btn">🖼️ Create image</button>
            <button className="suggestion-btn">✍️ Help me write</button>
            <button className="suggestion-btn">💡 Brainstorm</button>
            <button className="suggestion-btn">👨‍💻 Code</button>
            <button
              className="suggestion-btn"
              onClick={() => setShowSidebar(true)}
            >
              More
            </button>
          </div>
        </div>
      )}
{/* 💬 Chat Messages */}
<div
  className="flex-grow-1 overflow-auto px-3 py-2"
  style={{ maxHeight: "100%", minHeight: 0 }}
>
  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`chat-bubble mb-2 p-2 rounded ${
        msg.type === "user" ? "bg-primary text-end ms-auto" : "bg-secondary me-auto"
      }`}
      style={{ maxWidth: "85%", wordWrap: "break-word" }}
    >
      {msg.image && (
        <img
          src={msg.image}
          alt="uploaded"
          className="img-fluid mb-1 rounded"
        />
      )}
      {msg.text}
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>

{/* 😀 Emoji Picker */}
{showEmojiPicker && (
  <div className="px-2 mb-2">
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      theme={darkMode ? "dark" : "light"}
      height={300}
      width="100%"
    />
  </div>
)}

{/* 📝 Chat Input */}
<div
  className={`p-2 border-top position-relative ${
    darkMode ? "bg-black" : "bg-white"
  }`}
>
  <div className="d-flex flex-row align-items-center gap-2 w-100">
    {/* Image Upload Button */}
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      id="imageUpload"
      onChange={handleImageUpload}
    />
    <label htmlFor="imageUpload" className="btn-icon">
      <FaPlus />
    </label>

    {/* Chat Input Field */}
    <input
      type="text"
      className="form-control flex-grow-1"
      placeholder="Message ChatGPT"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    
    {/* Emoji Picker Button */}
    <button
      className="btn-icon"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    >
      <FaSmile />
    </button>

    {/* Microphone Button */}
    <button className="btn-icon">
      <FaMicrophone />
    </button>

    {/* Send Button */}
    <button
      className="btn btn-light d-flex justify-content-center align-items-center rounded-circle"
      style={{ width: 36, height: 36, padding: 0 }}
      onClick={handleSend}
    >
      <FaCircleArrowUp style={{ fontSize: 18 }} />
    </button>
  </div>

  {/* 🔘 Suggestion Buttons */}
  <div className="d-flex flex-row gap-2 mt-2 w-100">
    <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
      <FaGlobe /> Search
    </button>
    <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
      <FaLightbulb /> Reason
    </button>
    <button className="btn btn-outline-secondary">...</button>
  </div>
</div>


    </div>
  );
};

export default ChatGPTMobileUI;
