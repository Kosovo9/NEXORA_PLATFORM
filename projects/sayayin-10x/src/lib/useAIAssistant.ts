'use client';

import { useState } from 'react';

export function useAIAssistant() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const ask = async (prompt: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.reply || '...');
    } catch (err) {
      setResponse('Error connecting to AI.');
    } finally {
      setLoading(false);
    }
  };

  return { ask, response, loading };
}
