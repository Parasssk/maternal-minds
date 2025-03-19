
import React from "react";
import { ArrowDown } from "lucide-react";
import AnimatedBlob from "./AnimatedBlob";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToChat = () => {
    const chatSection = document.getElementById("chat");
    chatSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSchemes = () => {
    const schemesSection = document.getElementById("schemes");
    schemesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Blobs */}
      <AnimatedBlob 
        className="left-1/4 top-1/4 translate-x-1/2 translate-y-0" 
        color="bg-health-100" 
      />
      <AnimatedBlob 
        className="right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2" 
        color="bg-mother-100" 
      />
      <AnimatedBlob 
        className="left-1/3 bottom-1/3 -translate-x-1/2 translate-y-1/2" 
        color="bg-child-100" 
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <span className="chip-primary mb-4 animate-fade-in">AI-Powered Health Assistant</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-health-800 via-mother-700 to-child-800 animate-blur-in">
          Your Maternal &amp; Child Health Companion
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up">
          Personalized guidance for reproductive, maternal, newborn, child, and adolescent health with government scheme recommendations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <button 
            className="btn-primary"
            onClick={scrollToChat}
          >
            Start Conversation
          </button>
          <button 
            className="btn-secondary"
            onClick={scrollToSchemes}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a 
          href="#chat"
          onClick={(e) => {
            e.preventDefault();
            scrollToChat();
          }}
          className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
        >
          <ArrowDown size={20} className="text-foreground/60" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
