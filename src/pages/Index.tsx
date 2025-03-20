
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ChatInterface from '@/components/ChatInterface';
import HealthSchemes from '@/components/HealthSchemes';
import RegisterForm from '@/components/RegisterForm';

const Index: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  
  // Effect to scroll to the section based on URL hash
  useEffect(() => {
    // This handles initial load and browser back/forward
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      
      <main>
        <Hero />
        <RegisterForm language={language} />
        <ChatInterface language={language} />
        <HealthSchemes />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
