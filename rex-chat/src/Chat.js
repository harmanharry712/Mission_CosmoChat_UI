// src/Chat.js
import React, { useState, useEffect } from 'react';

const Chat = ({ onTerminate }) => {
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (input) {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(typingTimeout);
    } else {
      setIsTyping(false);
    }
  }, [input]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('New message from ReX Chat', {
        body: message,
      });
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      sendNotification(input);
      setInput('');
    }
  };

  const handleTerminate = () => {
    localStorage.removeItem('messages');
    onTerminate();
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div style={styles.typingIndicator}>ReX is typing...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.sendButton} onClick={handleSend}>Send</button>
      </div>
      <button style={styles.terminateButton} onClick={handleTerminate}>End Chat</button>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px 0',
    maxWidth: '60%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px 0',
    maxWidth: '60%',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px 0',
    maxWidth: '60%',
    fontStyle: 'italic',
    color: '#888',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#fff',
  },
  terminateButton: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    alignSelf: 'center',
  },
};

export default Chat;
