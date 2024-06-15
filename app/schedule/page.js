"use client";

import moment from 'moment';
import { useEffect, useState } from 'react';
import './schedule.css';

const Schedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const apiKey = 'AIzaSyDEfjHiuuPMtTpUzgQ57zyqxAgIof-on48';
    const spreadsheetId = '1NT81Low_JTLhklzUH_Dxm1ztA3Ov6b4NK8AZIx52Eq0';
    const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G?key=${apiKey}`;

    fetch(spreadsheetUrl)
      .then(response => response.json())
      .then(data => {
        const today = moment();
        const filteredEvents = data.values.filter(rowData => {
          const dataOrarioFine = moment(`${rowData[2]} ${rowData[4]}`, 'DD/MM/YYYY HH:mm');
          return dataOrarioFine.isAfter(today);
        });
        setEvents(filteredEvents);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="schedule">
      {events.map((rowData, index) => (
        <a key={index} className="evento" href={rowData[6]}>
          <img className="immagine" src={rowData[5]} alt={rowData[1]} />
          <div className="info">
            <div className="tag">{rowData[0]}</div>
            <div className="testo-info">
              {rowData[2]} - {rowData[3]} - {rowData[4]} • {rowData[1]}
              {moment(`${rowData[2]} ${rowData[3]}`, 'DD/MM/YYYY HH:mm').isSameOrBefore(moment()) &&
                moment(`${rowData[2]} ${rowData[4]}`, 'DD/MM/YYYY HH:mm').isSameOrAfter(moment()) && (
                  <span className="orario-corrente">•</span>
                )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Schedule;
