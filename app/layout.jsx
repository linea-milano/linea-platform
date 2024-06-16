// app/layout.jsx
import './globals.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { useEffect } from 'react';

const TOKEN_URL = 'https://linea-proxy.xyz/get-token';
const USER_URL = 'https://linea-proxy.xyz/get-user';
const TRACKS_URL = 'https://linea-proxy.xyz/get-tracks';
let allTracks = [];

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
        allTracks = tracks;
    } catch (error) {
        console.error('Errore nel recupero delle tracce:', error);
    }
}

function playTrack(trackUrl) {
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = `https://w.soundcloud.com/player/?url=${trackUrl}&auto_play=true`;
    widgetIframe.style.display = 'block';
}

async function init() {
    try {
        const accessToken = await fetchAccessToken();
        if (accessToken) {
            const userId = await fetchUserId(accessToken);
            if (userId) {
                await fetchTracks(userId, accessToken);
            } else {
                console.error('User ID non trovato.');
            }
        }
    } catch (error) {
        console.error('Errore durante l\'inizializzazione:', error);
    }
}

export default function RootLayout({ children }) {
    useEffect(() => {
        init();
    }, []);

    return (
        <html lang="en">
            <head />
            <body className="antialiased text-white bg-black">
                <Header />
                <div>{children}</div>
                <iframe
                    id="sc-widget"
                    className="soundcloud-widget"
                    scrolling="no"
                    frameBorder="no"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/303&auto_play=false"
                ></iframe>
                <Footer />
            </body>
        </html>
    );
}
