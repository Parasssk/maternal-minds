
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Volume2, Plus, StopCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateId, getCurrentTimestamp, getInitialMessage, getAIResponse, Message } from "@/utils/chatUtils";
import { startSpeechRecognition, speakText, stopSpeaking } from "@/utils/speechUtils";
import AnimatedBlob from "./AnimatedBlob";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ChatInterfaceProps {
  language: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Get text based on language
  const getText = (hi: string, en: string) => language === 'hi' ? hi : en;

  // Initialize messages when language changes
  useEffect(() => {
    setMessages([getInitialMessage(language)]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup speech recognition and synthesis on unmount
  useEffect(() => {
    return () => {
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
      stopSpeaking();
    };
  }, []);

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
      const response = await getAIResponse(inputMessage, language);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response,
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // If text-to-speech is active, speak the response
      if (isSpeaking) {
        speakText(response, language);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        id: generateId(),
        content: getText(
          "मुझे क्षमा करें, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।",
          "I'm sorry, I couldn't process your request. Please try again."
        ),
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        variant: "destructive",
        title: getText("त्रुटि", "Error"),
        description: getText(
          "AI प्रतिक्रिया प्राप्त करने में विफल। कृपया पुनः प्रयास करें।",
          "Failed to get AI response. Please try again."
        ),
      });
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

  const toggleSpeechRecognition = () => {
    if (isListening) {
      // Stop listening
      if (stopListeningRef.current) {
        stopListeningRef.current();
        stopListeningRef.current = null;
      }
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      
      toast({
        title: getText("सुन रहा हूँ...", "Listening..."),
        description: getText(
          "अब बोलिए। मैं आपकी बात सुन रहा हूँ।",
          "Speak now. I'm listening to you."
        ),
      });
      
      stopListeningRef.current = startSpeechRecognition(
        (text) => {
          setInputMessage(text);
        },
        () => {
          setIsListening(false);
        },
        language
      );
    }
  };

  const toggleTextToSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      toast({
        title: getText("टेक्स्ट-टू-स्पीच अक्षम", "Text-to-speech disabled"),
      });
    } else {
      setIsSpeaking(true);
      toast({
        title: getText("टेक्स्ट-टू-स्पीच सक्षम", "Text-to-speech enabled"),
        description: getText(
          "AI प्रतिक्रियाएँ ज़ोर से बोली जाएंगी।",
          "AI responses will be spoken aloud."
        ),
      });
      
      // Speak the last AI message if there is one
      const lastAiMessage = [...messages].reverse().find(m => m.role === 'assistant');
      if (lastAiMessage) {
        speakText(lastAiMessage.content, language);
      }
    }
  };

  const handleFindHospital = () => {
    toast({
      title: getText("अस्पताल खोजें", "Find Hospital"),
      description: getText(
        "आस-पास के स्वास्थ्य केंद्रों से जुड़ रहा हूँ...",
        "Connecting to nearby healthcare facilities..."
      ),
    });
    
    // In a real app, this would use geolocation and connect to a hospital API
    setTimeout(() => {
      const newMessage: Message = {
        id: generateId(),
        content: getText(
          "मैंने आपके पास कई स्वास्थ्य सुविधाएँ ढूंढ ली हैं। सबसे नज़दीकी मदर एंड चाइल्ड हॉस्पिटल (2.5 किमी दूर) है, जो मातृ और बाल सेवाएँ प्रदान करता है। क्या आप दिशा-निर्देश देखना चाहते हैं या उनकी संपर्क जानकारी प्राप्त करना चाहते हैं?",
          "I've located several healthcare facilities near you. The closest is Mother & Child Hospital (2.5km away), which offers maternal and pediatric services. Would you like me to show directions or provide their contact information?"
        ),
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      if (isSpeaking) {
        speakText(newMessage.content, language);
      }
    }, 2000);
  };

  const handleSetReminder = () => {
    toast({
      title: getText("स्वास्थ्य अनुस्मारक", "Health Reminders"),
      description: getText(
        "आपका स्वास्थ्य अनुस्मारक सेट कर रहा हूँ...",
        "Setting up your health reminder..."
      ),
    });
    
    // In a real app, this would save to a database or local storage
    setTimeout(() => {
      const newMessage: Message = {
        id: generateId(),
        content: getText(
          "मैं आपको स्वास्थ्य अनुस्मारक सेट करने में मदद कर सकता हूँ। आप किस प्रकार का अनुस्मारक चाहते हैं? विकल्प शामिल हैं: टीकाकरण कार्यक्रम, प्रसव पूर्व जांच, दवा अनुस्मारक, या आहार संबंधी सिफारिशें।",
          "I can help you set up health reminders. What type of reminder would you like? Options include: vaccination schedules, prenatal check-ups, medication reminders, or dietary recommendations."
        ),
        role: "assistant",
        timestamp: getCurrentTimestamp(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      if (isSpeaking) {
        speakText(newMessage.content, language);
      }
    }, 1000);
  };

  return (
    <section id="chat" className="relative py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <span className="chip-health mb-2">{getText("बुद्धिमान सहायता", "Intelligent Assistance")}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText("AI स्वास्थ्य सहायक", "AI Health Assistant")}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {getText(
              "मातृ, नवजात, बच्चा और किशोर स्वास्थ्य के बारे में प्रश्न पूछें। व्यक्तिगत सलाह और सरकारी योजना सिफारिशें प्राप्त करें।",
              "Ask questions about maternal, newborn, child, and adolescent health. Get personalized advice and government scheme recommendations."
            )}
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
                  <h3 className="font-medium">{getText("स्वास्थ्य सहायक", "Health Assistant")}</h3>
                  <p className="text-xs text-foreground/60">RMNCHA {getText("सहायता", "Support")}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse-soft ml-1"></span>
                  <span className="text-xs text-foreground/60">{getText("ऑनलाइन", "Online")}</span>
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                        onClick={() => {
                          toast({
                            title: getText("अतिरिक्त विकल्प", "Additional Options"),
                            description: getText(
                              "आप अपनी स्वास्थ्य चिंताओं से संबंधित छवियों या फाइलों को संलग्न कर सकते हैं।",
                              "You can attach images or files related to your health concerns."
                            ),
                          });
                        }}
                      >
                        <Plus size={20} className="text-foreground/70" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getText("संलग्नक जोड़ें", "Add attachments")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={getText("अपना स्वास्थ्य प्रश्न लिखें...", "Type your health question...")}
                    className="w-full px-4 py-2.5 bg-secondary/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                    disabled={isProcessing}
                  />
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className={`p-2 rounded-full transition-colors ${
                          isListening ? "bg-red-500 text-white hover:bg-red-600" : "hover:bg-secondary"
                        }`}
                        onClick={toggleSpeechRecognition}
                        title={getText("वॉयस इनपुट", "Voice input")}
                      >
                        {isListening ? <StopCircle size={20} /> : <Mic size={20} className="text-foreground/70" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isListening ? getText("सुनना बंद करें", "Stop listening") : getText("वॉयस इनपुट शुरू करें", "Start voice input")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className={`p-2 rounded-full transition-colors ${
                          isSpeaking ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-secondary"
                        }`}
                        onClick={toggleTextToSpeech}
                        title={getText("टेक्स्ट टू स्पीच", "Text to speech")}
                      >
                        <Volume2 size={20} className={isSpeaking ? "text-white" : "text-foreground/70"} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isSpeaking ? getText("टेक्स्ट-टू-स्पीच अक्षम करें", "Disable text-to-speech") : getText("टेक्स्ट-टू-स्पीच सक्षम करें", "Enable text-to-speech")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
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
            <button 
              onClick={toggleTextToSpeech}
              className="glass rounded-xl p-4 text-center card-hover border border-transparent hover:border-health-200 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-health-100 flex items-center justify-center">
                <Volume2 size={18} className="text-health-700" />
              </div>
              <h3 className="font-medium mb-1">{getText("वॉयस सहायता", "Voice Support")}</h3>
              <p className="text-sm text-foreground/70">{getText("अपनी क्षेत्रीय भाषा में बोलें", "Speak in your regional language")}</p>
            </button>
            
            <button 
              onClick={handleFindHospital}
              className="glass rounded-xl p-4 text-center card-hover border border-transparent hover:border-mother-200 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-mother-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mother-700">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                  <path d="M5 18v2"></path>
                  <path d="M19 18v2"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">{getText("अस्पताल कनेक्ट", "Hospital Connect")}</h3>
              <p className="text-sm text-foreground/70">{getText("आस-पास के स्वास्थ्य केंद्र खोजें", "Find nearby healthcare facilities")}</p>
            </button>
            
            <button 
              onClick={handleSetReminder}
              className="glass rounded-xl p-4 text-center card-hover border border-transparent hover:border-child-200 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-child-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-child-700">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M9 21V9"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">{getText("स्वास्थ्य अनुस्मारक", "Health Reminders")}</h3>
              <p className="text-sm text-foreground/70">{getText("आहार और टीकाकरण अलर्ट", "Diet and vaccination alerts")}</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
