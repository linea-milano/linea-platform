"use client";
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const apiKey = 'AIzaSyDEfjHiuuPMtTpUzgQ57zyqxAgIof-on48';
      const spreadsheetId = '1NT81Low_JTLhklzUH_Dxm1ztA3Ov6b4NK8AZIx52Eq0';
      const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G?key=${apiKey}`;

      try {
        const response = await fetch(spreadsheetUrl);
        const data = await response.json();
        setEvents(data.values);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const today = moment();

  return (
    <div id="dati">
      {events.map((rowData, index) => {
        const tag = rowData[0];
        const nome = rowData[1];
        const data = rowData[2];
        const orarioInizio = rowData[3];
        const orarioFine = rowData[4];
        const linkDrive = rowData[5];
        const linkColonnaG = rowData[6];

        const dataOrarioInizio = moment(`${data} ${orarioInizio}`, 'DD/MM/YYYY HH:mm');
        const dataOrarioFine = moment(`${data} ${orarioFine}`, 'DD/MM/YYYY HH:mm');

        if (dataOrarioFine.isAfter(today)) {
          return (
            <a key={index} className="evento" href={linkColonnaG}>
              <img className="immagine" src={linkDrive} alt={nome} />
              <div className="info">
                <div className="tag">{tag}</div>
                <div className="testo-info">
                  {data} - {orarioInizio} - {orarioFine} • {nome}
                  {dataOrarioInizio.isSameOrBefore(today) && dataOrarioFine.isSameOrAfter(today) && (
                    <span className="orario-corrente">•</span>
                  )}
                </div>
              </div>
            </a>
          );
        }
      })}
    </div>
  );
}
