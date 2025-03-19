
import React, { useState, useEffect } from "react";
import { Menu, X, Users, Globe } from "lucide-react";
import AshaWorkersList from "./AshaWorkersList";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ashaWorkersOpen, setAshaWorkersOpen] = useState(false);
  const { toast } = useToast();

  // Get text based on language
  const getText = (hi: string, en: string) => language === 'hi' ? hi : en;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: value === 'hi' ? "भाषा बदल दी गई है" : "Language changed",
      description: value === 'hi' ? "हिंदी भाषा चुनी गई है" : "English language selected",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-health-700 to-health-500">
            RMNCHA
          </span>
          <span className="ml-2 text-xs md:text-sm chip-health">
            {getText("स्वास्थ्य सहायक", "Health Assistant")}
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
            {getText("होम", "Home")}
          </a>
          <a href="#chat" className="text-foreground/80 hover:text-primary transition-colors">
            {getText("चैट सहायक", "Chat Assistant")}
          </a>
          <a href="#schemes" className="text-foreground/80 hover:text-primary transition-colors">
            {getText("स्वास्थ्य योजनाएँ", "Health Schemes")}
          </a>
          
          {/* ASHA Workers Button */}
          <button 
            onClick={() => setAshaWorkersOpen(true)}
            className="flex items-center gap-1.5 text-foreground/80 hover:text-health-600 transition-colors"
          >
            <Users size={18} />
            <span>{getText("आशा कार्यकर्ता", "ASHA Workers")}</span>
          </button>
          
          {/* Language Select */}
          <div className="flex items-center gap-1.5">
            <Globe size={18} className="text-foreground/70" />
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="h-8 w-24 text-sm">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <button className="btn-primary">
            {getText("शुरू करें", "Get Started")}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background glass animate-slide-down pb-4 border-b border-border">
          <nav className="container mx-auto px-4 flex flex-col space-y-4 pt-4">
            <a 
              href="#" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getText("होम", "Home")}
            </a>
            <a 
              href="#chat" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getText("चैट सहायक", "Chat Assistant")}
            </a>
            <a 
              href="#schemes" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getText("स्वास्थ्य योजनाएँ", "Health Schemes")}
            </a>
            
            {/* ASHA Workers Button (Mobile) */}
            <button 
              className="flex items-center gap-1.5 text-foreground/80 hover:text-health-600 transition-colors py-2 text-left"
              onClick={() => {
                setAshaWorkersOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <Users size={18} />
              <span>{getText("आशा कार्यकर्ता", "ASHA Workers")}</span>
            </button>
            
            {/* Language Select (Mobile) */}
            <div className="flex items-center gap-1.5 py-2">
              <Globe size={18} className="text-foreground/70" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="h-8 w-24 text-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <button 
              className="btn-primary w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getText("शुरू करें", "Get Started")}
            </button>
          </nav>
        </div>
      )}
      
      {/* ASHA Workers List Modal */}
      <AshaWorkersList open={ashaWorkersOpen} onOpenChange={setAshaWorkersOpen} language={language} />
    </header>
  );
};

export default Header;
