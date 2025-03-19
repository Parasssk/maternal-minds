
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import HealthSchemes from "@/components/HealthSchemes";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
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
