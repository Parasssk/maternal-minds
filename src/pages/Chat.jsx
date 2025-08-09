import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Helmet } from 'react-helmet-async';

const Chat = ({ language = 'en' }) => {
  return (
    <main>
      <Helmet>
        <title>Chat | RMNCHA Health Assistant</title>
        <meta name="description" content="Chat with the AI health assistant for guidance on maternal and child health topics in English or Hindi." />
        <link rel="canonical" href="/chat" />
      </Helmet>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="sr-only">Chat with AI Health Assistant</h1>
        </div>
      </section>
      <ChatInterface language={language} />
    </main>
  );
};

export default Chat;
