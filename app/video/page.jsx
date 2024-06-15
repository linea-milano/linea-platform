// app/about/page.js
import React from 'react';
import './video.css'; // Usa il file CSS senza .module

export const metadata = {
  title: 'About Us | Linea Media',
};

const AboutPage = () => {
  return (
    <div className="container">
      <h1>VIDEO</h1>
      <p>
        QUi carichiamo tutti i video.
      </p>
    
    </div>
  );
};

export default AboutPage;
