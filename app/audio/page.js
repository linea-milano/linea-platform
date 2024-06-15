"use client";
import { useEffect, useState } from 'react';
import './audio.css';

const Audio = () => {
    const [tracks, setTracks] = useState([]);
    const [tags, setTags] = useState(new Set());

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
                populateTags(tracks);
            } catch (error) {
                console.error('Errore nel recupero delle tracce:', error);
            }
        }

        function populateTags(tracks) {
            const tagsSet = new Set();
            tracks.forEach(track => {
                if (track.tag_list) {
                    const trackTags = track.tag_list.split(' ');
                    trackTags.forEach(tag => {
                        tagsSet.add(tag);
                    });
                }
            });
            setTags(tagsSet);
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

        init();
    }, []);

    const applyFilters = () => {
        const filter1 = document.getElementById('filter1').value;
        const filter2 = document.getElementById('filter2').value;
        const filteredTracks = tracks.filter(track => {
            const trackTags = track.tag_list ? track.tag_list.split(' ') : [];
            const filter1Match = filter1 ? trackTags.includes(filter1) : true;
            const filter2Match = filter2 ? trackTags.includes(filter2) : true;
            return filter1Match && filter2Match;
        });
        setTracks(filteredTracks);
    };

    const playTrack = (trackUrl) => {
        const widgetIframe = document.getElementById('sc-widget');
        widgetIframe.style.display = 'block'; // Mostra il player
        const widget = SC.Widget(widgetIframe);
        widget.load(trackUrl, {
            auto_play: true,
            show_comments: false,
            hide_related: true,
            visual: false
        });
    };

    return (
        <div>
            <h1>AUDIO ARCHIVIO</h1>
            <div id="filter-container">
                <select id="filter1" className="filter-select" onChange={applyFilters}>
                    <option value="">Seleziona Tag 1</option>
                    {[...tags].map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
                <select id="filter2" className="filter-select" onChange={applyFilters}>
                    <option value="">Seleziona Tag 2</option>
                    {[...tags].map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
            <div id="tracks">
                {tracks.map((track, index) => {
                    let artworkUrl = track.artwork_url;
                    if (artworkUrl) {
                        artworkUrl = artworkUrl.replace('-large', '-t500x500');
                    } else {
                        artworkUrl = 'https://via.placeholder.com/500';
                    }
                    return (
                        <div key={index} className="track" onClick={() => playTrack(track.permalink_url)}>
                            <img src={artworkUrl} alt={track.title} />
                            <div className="track-title">{track.title}</div>
                        </div>
                    );
               
