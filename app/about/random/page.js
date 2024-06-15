// app/about/page.js
import React from 'react';
import './about.css'; // Usa il file CSS senza .module

export const metadata = {
  title: 'About Us | Linea Media',
};

const AboutPage = () => {
  return (
    <div className="container">
      <h1>ABOUT</h1>
      <p>
        LINEA is an innovative space in the heart of the city, where indie labels, creative publishers, and cutting-edge designers come together to bring new ideas to life.
        With interactive events, art exhibitions, and a diverse music program, we have transformed a Milan metro station into a place of inspiration and connection between artists and the multitude of travelers passing through the subway every day.
      </p>
      <h2>AIM</h2>
      <p>
        Enrich the subway area and enhance the daily commute experience by hosting community-focused initiatives and creating a platform for open, respectful discussions.
        Our music program embraces an array of genres, from techno and experimental sounds to bass-heavy beats, hip-hop vibes, house, disco, and more.
        We're committed to championing young and talented artists across various creative domains.
        A vision to transform a subway station into a dynamic hub that connects emerging artists with the broader creative community.
      </p>
      <h2>EDITORIAL</h2>
      <p>
        If you are a freelance writer looking to share your work on our news and editorial platform, we welcome article pitches from writers of all experience levels.
        Please send yours to: <a href="mailto:welcome@linea.media">welcome@linea.media</a>
      </p>
      <p>
        If you want to submit your RESIDENT SHOW click <a href="#">here</a>
      </p>
    </div>
  );
};

export default AboutPage;
