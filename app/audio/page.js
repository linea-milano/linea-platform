'use client';

import { useEffect } from 'react';
import './audio.css';

const TOKEN_URL = 'https://linea-proxy.xyz/get-token';
const USER_URL = 'https://linea-proxy.xyz/get-user';
const TRACKS_URL = 'https://linea-proxy.xyz/get-tracks';
let allTracks = [];

async function fetchAccessToken() {
    const response = await fetch(TOKEN_URL);
    const data = await response.json();
    return data.access_token;
}

async function fetchUserId(accessToken) {
    const response = await fetch(USER_URL, {
        headers: {
            Authorization: `OAuth ${accessToken}`
        }
    });
    const data = await response.json();
    return data.id;
}

async function fetchTracks(userId, accessToken) {
    const tracksUrl = `${TRACKS_URL}?user_id=${userId}`;
    const response = await fetch(tracksUrl, {
        headers: {
            Authorization: `OAuth ${accessToken}`
        }
    });
    const tracks = await response.json();
    allTracks = tracks;
    displayTracks(tracks);
}

function displayTracks(tracks) {
    const tracksContainer = document.getElementById('tracks');
    tracksContainer.innerHTML = '';

    tracks.forEach(track => {
        let artworkUrl = track.artwork_url;
        if (artworkUrl) {
            artworkUrl = artworkUrl.replace('-large', '-t500x500');
        } else {
            artworkUrl = 'https://via.placeholder.com/500';
        }
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');
        trackElement.innerHTML = `
            <img src="${artworkUrl}" alt="${track.title}">
            <div class="track-title">${track.title}</div>
        `;
        trackElement.addEventListener('click', () => {
            playTrack(track.permalink_url);
        });
        tracksContainer.appendChild(trackElement);
    });
}

function playTrack(trackUrl) {
    const widgetIframe = document.getElementById('sc-widget');
    widgetIframe.src = `https://w.soundcloud.com/player/?url=${trackUrl}&auto_play=true`;
    widgetIframe.style.display = 'block';
}

async function init() {
    const accessToken = await fetchAccessToken();
    const userId = await fetchUserId(accessToken);
    await fetchTracks(userId, accessToken);
}

export default function Page() {
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <h1>AUDIO ARCHIVIO</h1>
            <div id="tracks"></div>
            <iframe
                id="sc-widget"
                className="soundcloud-widget"
                scrolling="no"
                frameBorder="no"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/303&auto_play=false"
            ></iframe>
        </>
    );
}
