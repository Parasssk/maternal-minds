import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import Chat from './pages/Chat';

const App = () => {
  const [language, setLanguage] = React.useState('en');
  
  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/chat" element={<Chat language={language} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
