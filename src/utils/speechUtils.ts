
// Basic speech recognition utility
export const startSpeechRecognition = (
  onResult: (text: string) => void, 
  onEnd: () => void,
  lang: string = 'en-US'
): (() => void) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.error('Speech recognition not supported in this browser');
    onEnd();
    return () => {};
  }

  // Map application language to browser speech API language
  const langMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
  };

  // @ts-ignore - Using browser API that TypeScript might not know
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = langMap[lang] || 'en-US'; // Set language based on input
  recognition.continuous = false;
  recognition.interimResults = true;
  
  recognition.onresult = (event: any) => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');
    
    onResult(transcript);
  };
  
  recognition.onend = () => {
    onEnd();
  };
  
  recognition.onerror = (event: any) => {
    console.error('Speech recognition error', event.error);
    onEnd();
  };
  
  recognition.start();
  
  // Return stop function
  return () => {
    recognition.stop();
  };
};

// Text-to-speech utility
export const speakText = (text: string, lang: string = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-speech not supported in this browser');
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map application language to browser speech API language
  const langMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
  };
  
  utterance.lang = langMap[lang] || 'en-US';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
