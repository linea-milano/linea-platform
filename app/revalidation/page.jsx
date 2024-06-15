"use client";
import React, { useEffect, useState } from 'react';

export default function RevalidationPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/your-endpoint')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Errore nel caricamento dei dati: {error.message}</div>;
  }

  if (!data) {
    return <div>Caricamento...</div>;
  }

  if (!data.values || !Array.isArray(data.values) || data.values.length === 0) {
    return <div>Nessun dato disponibile.</div>;
  }

  return (
    <div>
      {data.values.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
