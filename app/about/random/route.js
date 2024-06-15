// app/about/page.js
import React from 'react';
import axios from 'axios';
import styles from './about.css';

export const metadata = {
  title: 'About Us | Linea Media',
};

const AboutPage = ({ aboutData }) => {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get('https://linea.media/about');
  const aboutData = response.data;

  return {
    props: {
      aboutData,
    },
  };
}

export default AboutPage;
