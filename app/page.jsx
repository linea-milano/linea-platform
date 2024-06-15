// app/page.js
import React from 'react';

export const metadata = {
  title: 'Home | Linea Media',
};

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Linea Media</h1>
      <div className="video-player">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HomePage;
