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
                const upcomingEvents = data.values.filter(rowData => {
                    const dataOrarioFine = moment(`${rowData[2]} ${rowData[4]}`, 'DD/MM/YYYY HH:mm');
                    return dataOrarioFine.isAfter(today);
                });
                setEvents(upcomingEvents);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="schedule-container">
            <h1 className="schedule-title">Schedule</h1>
            {events.map((event, index) => (
                <div key={index} className="event">
                    <img src={event[5]} alt={event[1]} />
                    <div className="event-details">
                        <h2 className="event-title">{event[1]}</h2>
                        <p className="event-time">{`${event[2]} - ${event[3]} - ${event[4]}`}</p>
                        <p>{event[0]}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Schedule;
