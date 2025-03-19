
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Volume2, Plus } from "lucide-react";
import { generateId, getCurrentTimestamp, initialMessages, getAIResponse, Message } from "@/utils/chatUtils";
import AnimatedBlob from "./AnimatedBlob";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isProcessing) return;

    const userMessage: Message = {
      id: generateId(),
      content: inputMessage,
      role: "user",
      timestamp: getCurrentTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    try {
      const response = await getAIResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response,
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        id: generateId(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      // Focus the input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="chat" className="relative py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <span className="chip-health mb-2">Intelligent Assistance</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Health Assistant</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Ask questions about maternal, newborn, child, and adolescent health.
            Get personalized advice and government scheme recommendations.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Background Blobs */}
          <AnimatedBlob 
            className="right-0 top-0 translate-x-1/2 -translate-y-1/2" 
            color="bg-health-100/50" 
          />
          <AnimatedBlob 
            className="left-0 bottom-0 -translate-x-1/2 translate-y-1/2" 
            color="bg-child-100/50" 
          />

          {/* Chat Container */}
          <div className="relative glass rounded-2xl shadow-lg overflow-hidden border border-border">
            {/* Chat Header */}
            <div className="bg-card/50 p-4 border-b border-border">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-health-500 to-child-500 flex items-center justify-center text-white">
                  <span className="text-sm font-semibold">HA</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Health Assistant</h3>
                  <p className="text-xs text-foreground/60">RMNCHA Support</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></span>
                  <span className="text-xs ml-1 text-foreground/60">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-[400px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.role === "user" ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  <div
                    className={`animate-slide-up ${
                      message.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start mb-4">
                  <div className="chat-bubble-bot">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Plus size={20} className="text-foreground/70" />
                </button>
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your health question..."
                    className="w-full px-4 py-2.5 bg-secondary/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                    disabled={isProcessing}
                  />
                </div>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  title="Voice input"
                >
                  <Mic size={20} className="text-foreground/70" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  title="Text to speech"
                >
                  <Volume2 size={20} className="text-foreground/70" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === "" || isProcessing}
                  className={`p-2 rounded-full ${
                    inputMessage.trim() === "" || isProcessing
                      ? "text-foreground/30 bg-secondary/50"
                      : "text-white bg-primary hover:bg-primary/90"
                  } transition-colors`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="glass rounded-xl p-4 text-center card-hover">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-health-100 flex items-center justify-center">
                <Volume2 size={18} className="text-health-700" />
              </div>
              <h3 className="font-medium mb-1">Voice Support</h3>
              <p className="text-sm text-foreground/70">Speak in your regional language</p>
            </div>
            <div className="glass rounded-xl p-4 text-center card-hover">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-mother-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mother-700">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                  <path d="M5 18v2"></path>
                  <path d="M19 18v2"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">Hospital Connect</h3>
              <p className="text-sm text-foreground/70">Find nearby healthcare facilities</p>
            </div>
            <div className="glass rounded-xl p-4 text-center card-hover">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-child-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-child-700">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M9 21V9"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">Health Reminders</h3>
              <p className="text-sm text-foreground/70">Diet and vaccination alerts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
