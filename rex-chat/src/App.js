// src/App.js
import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Chat from './Chat';

const App = () => {
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = () => {
    setChatStarted(true);
  };

  return (
    <div>
      {chatStarted ? <Chat /> : <LandingPage onStartChat={handleStartChat} />}
    </div>
  );
};

export default App;
