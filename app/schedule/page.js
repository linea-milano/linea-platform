'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/schedule.css'; // Importa il file CSS

const Schedule = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'YOUR_API_KEY';
            const spreadsheetId = 'YOUR_SPREADSHEET_ID';
            const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G?key=${apiKey}`;

            try {
                const response = await fetch(spreadsheetUrl);
                const data = await response.json();
                setEvents(data.values);
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        };
        fetchData();
    }, []);

    const today = new Date();

    return (
        <div id="dati">
            {events && events.map((rowData, index) => {
                const [tag, nome, data, orarioInizio, orarioFine, linkDrive, linkColonnaG] = rowData;
                const dataOrarioInizio = new Date(`${data}T${orarioInizio}`);
                const dataOrarioFine = new Date(`${data}T${orarioFine}`);

                if (dataOrarioFine > today) {
                    return (
                        <div key={index} className="evento">
                            <img src={linkDrive} alt={nome} className="immagine" />
                            <div className="info">
                                <div className="tag">{tag}</div>
                                <div className="nome">{nome}</div>
                                <div className="data">{data}</div>
                                <div className="orario">{orarioInizio} - {orarioFine}</div>
                                {dataOrarioInizio <= today && dataOrarioFine >= today && <span className="orario-corrente">•</span>}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Schedule;
