import React from 'react';
import Hero from '@/components/Hero';
import { Helmet } from 'react-helmet-async';

const Home = ({ language = 'en' }) => {
  return (
    <article>
      <Helmet>
        <title>RMNCHA Health Assistant | Home</title>
        <meta name="description" content="AI-powered RMNCHA health assistant providing guidance for maternal, newborn, child, and adolescent health." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Hero />
    </article>
  );
};

export default Home;
