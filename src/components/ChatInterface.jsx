import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const ChatInterface = ({ language = 'en' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockResponses = {
    en: [
      "Thank you for your question about maternal health. Based on current guidelines, it's recommended to have regular prenatal checkups.",
      "For child nutrition, ensure a balanced diet with fruits, vegetables, and adequate protein sources.",
      "Please consult your healthcare provider for personalized advice regarding your specific situation.",
      "Regular exercise during pregnancy is beneficial, but always consult with your doctor first."
    ],
    hi: [
      "मातृत्व स्वास्थ्य के बारे में आपके प्रश्न के लिए धन्यवाद। वर्तमान दिशानिर्देशों के अनुसार नियमित जांच कराना जरूरी है।",
      "बच्चों के पोषण के लिए फल, सब्जियां और पर्याप्त प्रोटीन युक्त संतुलित आहार सुनिश्चित करें।",
      "अपनी विशिष्ट स्थिति के लिए व्यक्तिगत सलाह हेतु कृपया अपने स्वास्थ्य सेवा प्रदाता से संपर्क करें।"
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const responses = mockResponses[language] || mockResponses.en;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getText = (key) => {
    const texts = {
      title: {
        en: "Chat with AI Health Assistant",
        hi: "AI स्वास्थ्य सहायक से बात करें"
      },
      placeholder: {
        en: "Ask about maternal or child health...",
        hi: "मातृ या बाल स्वास्थ्य के बारे में पूछें..."
      },
      send: {
        en: "Send",
        hi: "भेजें"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || '';
  };

  return (
    <section id="chat" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {getText('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant, AI-powered guidance on maternal and child health topics
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border">
            <div className="h-96 p-6 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                  <Bot size={48} className="mx-auto mb-4 text-primary" />
                  <p>Start a conversation about health topics</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`chat-bubble ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                  }`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="chat-bubble chat-bubble-bot">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={getText('placeholder')}
                  className="flex-1 px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="btn-primary px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {getText('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;