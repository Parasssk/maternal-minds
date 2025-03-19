
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import HealthSchemes from "@/components/HealthSchemes";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  // Handle URL hash for scrolling to sections
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ChatInterface />
      <HealthSchemes />
      <Footer />
    </div>
  );
};

export default Index;
