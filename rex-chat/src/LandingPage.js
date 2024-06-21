// src/LandingPage.js
import React from 'react';

const LandingPage = ({ onStartChat }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to ReX Chat</h1>
      <button style={styles.button} onClick={onStartChat}>Start Chat</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#282c34',
  },
};

export default LandingPage;

