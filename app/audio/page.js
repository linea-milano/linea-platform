"use client";
import { useEffect, useState } from 'react';
import './audio.css';

const Audio = () => {
    const [tracks, setTracks] = useState([]);
    
    useEffect(() => {
        const TOKEN_URL = 'https://linea-proxy.xyz/get-token';
        const USER_URL = 'https://linea-proxy.xyz/get-user';
        const TRACKS_URL = 'https://linea-proxy.xyz/get-tracks';

        async function fetchAccessToken() {
            try {
                const response = await fetch(TOKEN_URL);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                return data.access_token;
            } catch (error) {
                console.error('Errore nel recupero del token di accesso:', error);
            }
        }

        async function fetchUserId(accessToken) {
            try {
                const response = await fetch(USER_URL, {
                    headers: {
                        Authorization: `OAuth ${accessToken}`
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                return data.id;
            } catch (error) {
                console.error('Errore nel recupero dell\'ID utente:', error);
                return null;
            }
        }

        async function fetchTracks(userId, accessToken) {
            try {
                const tracksUrl = `${TRACKS_URL}?user_id=${userId}`;
                const response = await fetch(tracksUrl, {
                    headers: {
                        Authorization: `OAuth ${accessToken}`
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const tracks = await response.json();
                setTracks(tracks);
            } catch (error) {
                console.error('Errore nel recupero delle tracce:', error);
            }
        }

        async function init() {
            try {
                const accessToken = await fetchAccessToken();
                if (accessToken) {
                    const userId = await fetchUserId(accessToken);
                    if (userId) {
                        await fetchTracks(userId, accessToken);
                    }
                }
            } catch (error) {
                console.error('Errore durante l\'inizializzazione:', error);
            }
        }

        init();
    }, []);

    const playTrack = (trackUrl) => {
        const widgetIframe = document.getElementById('sc-widget');
        widgetIframe.style.display = 'block';
        const widget = SC.Widget(widgetIframe);
        widget.load(trackUrl, {
            auto_play: true,
            show_comments: false,
            hide_related: true,
            visual: false
        });
    };

    return (
        <div id="audio-container">
            <h1>AUDIO ARCHIVIO</h1>
            <div id="tracks">
                {tracks.map(track => (
                    <div key={track.id} className="track" onClick={() => playTrack(track.permalink_url)}>
                        <img src={track.artwork_url ? track.artwork_url.replace('-large', '-t500x500') : 'https://via.placeholder.com/500'} alt={track.title} />
                        <div className="track-title">{track.title}</div>
                    </div>
                ))}
            </div>
            <iframe id="sc-widget" className="soundcloud-widget" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/303&auto_play=false"></iframe>
        </div>
    );
};

export default Audio;
