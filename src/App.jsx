import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import HealthSchemes from './components/HealthSchemes';

const App = () => {
  const [language, setLanguage] = React.useState('en');
  
  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      
      <main>
        <Hero />
        <ChatInterface language={language} />
        <HealthSchemes />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
