// src/App.js
import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Chat from './Chat';
import Dashboard from './Dashboard';

const App = () => {
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = () => {
    setChatStarted(true);
  };

  const handleTerminateChat = () => {
    setChatStarted(false);
  };

  return (
    <div>
      {chatStarted ? <Chat onTerminate={handleTerminateChat} /> : <LandingPage onStartChat={handleStartChat} />}
      <Dashboard />
    </div>
  );
};

export default App;
