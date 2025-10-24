import React, { useState } from 'react';

const ChatInterface = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="p-4 bg-gray-800/70 backdrop-blur-sm rounded-2xl mt-auto shadow-2xl">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 p-3 bg-gray-700/80 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
          placeholder="Escribe tu pregunta aquí..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Enviar Pregunta'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
