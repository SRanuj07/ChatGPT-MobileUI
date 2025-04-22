// src/App.js

import React from 'react';
import ChatGPTMobileUI from './components/ChatGPTMobileUI'; // ✅ Main Chat UI Component
import './components/ChatGPTMobileUI.css'; // ✅ Dark mode + layout CSS

function App() {
  return (
    <div className="App">
      {/* 🚀 Render the ChatGPT Mobile UI Component */}
      <ChatGPTMobileUI />
    </div>
  );
}

export default App;
