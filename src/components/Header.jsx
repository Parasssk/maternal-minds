import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Users } from 'lucide-react';

const Header = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAshaWorkers, setShowAshaWorkers] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getText = (key) => {
    const texts = {
      title: { en: "RMNCHA", hi: "आरएमएनसीएच" },
      subtitle: { en: "Health Assistant", hi: "स्वास्थ्य सहायक" },
      home: { en: "Home", hi: "होम" },
      chat: { en: "Chat Assistant", hi: "चैट सहायक" },
      schemes: { en: "Health Schemes", hi: "स्वास्थ्य योजनाएं" },
      ashaWorkers: { en: "ASHA Workers", hi: "आशा कार्यकर्ता" },
      register: { en: "Register Pregnancy", hi: "गर्भावस्था पंजीकरण" }
    };
    return texts[key]?.[language] || texts[key]?.en || '';
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{getText('title')}</h1>
                <p className="text-xs text-muted-foreground">{getText('subtitle')}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-foreground hover:text-primary transition-colors"
              >
                {getText('home')}
              </button>
              <button 
                onClick={() => scrollToSection('chat')}
                className="text-foreground hover:text-primary transition-colors"
              >
                {getText('chat')}
              </button>
              <button 
                onClick={() => scrollToSection('schemes')}
                className="text-foreground hover:text-primary transition-colors"
              >
                {getText('schemes')}
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowAshaWorkers(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-muted transition-colors"
              >
                <Users size={16} />
                {getText('ashaWorkers')}
              </button>

              <div className="flex items-center gap-2">
                <Globe size={16} className="text-muted-foreground" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-transparent border rounded px-2 py-1 text-sm"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>

              <button
                onClick={() => setShowRegisterForm(true)}
                className="btn-primary"
              >
                {getText('register')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                {getText('home')}
              </button>
              <button 
                onClick={() => scrollToSection('chat')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                {getText('chat')}
              </button>
              <button 
                onClick={() => scrollToSection('schemes')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                {getText('schemes')}
              </button>
              
              <div className="pt-4 border-t space-y-3">
                <button
                  onClick={() => {
                    setShowAshaWorkers(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full py-2 text-foreground hover:text-primary transition-colors"
                >
                  <Users size={16} />
                  {getText('ashaWorkers')}
                </button>

                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-muted-foreground" />
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent border rounded px-2 py-1 text-sm flex-1"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setShowRegisterForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full"
                >
                  {getText('register')}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Simple Modal Placeholders */}
      {showAshaWorkers && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">ASHA Workers</h3>
            <p className="text-muted-foreground mb-4">Find ASHA workers in your area.</p>
            <button 
              onClick={() => setShowAshaWorkers(false)}
              className="btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showRegisterForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Register Pregnancy</h3>
            <p className="text-muted-foreground mb-4">Register your pregnancy for health tracking.</p>
            <button 
              onClick={() => setShowRegisterForm(false)}
              className="btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;