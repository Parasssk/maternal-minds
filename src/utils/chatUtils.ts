
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getCurrentTimestamp = (): Date => {
  return new Date();
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getInitialMessage = (language: string): Message => {
  const content = language === 'hi' 
    ? "नमस्ते! मैं आपका RMNCHA स्वास्थ्य सहायक हूँ। मैं आज आपकी मातृ, नवजात, शिशु, या किशोर स्वास्थ्य के बारे में कैसे मदद कर सकता हूँ?"
    : "Hello! I'm your RMNCHA health assistant. How can I help you today with maternal, newborn, child, or adolescent health?";
  
  return {
    id: generateId(),
    content,
    role: 'assistant',
    timestamp: getCurrentTimestamp(),
  };
};

export const initialMessages: Message[] = [
  {
    id: generateId(),
    content: "Hello! I'm your RMNCHA health assistant. How can I help you today with maternal, newborn, child, or adolescent health?",
    role: 'assistant',
    timestamp: getCurrentTimestamp(),
  },
];

// Hindi responses
const hindiResponses: Record<string, string> = {
  pregnancy: "गर्भावस्था के दौरान नियमित प्रसव पूर्व देखभाल आवश्यक है। जननी सुरक्षा योजना (JSY) अस्पताल में प्रसव के लिए वित्तीय सहायता प्रदान करती है। क्या आप गर्भावस्था देखभाल या सरकारी योजनाओं के बारे में अधिक जानना चाहेंगे?",
  
  baby: "नवजात शिशुओं को जन्म के 24 घंटे के भीतर पहला टीकाकरण मिलना चाहिए। पहले 6 महीनों के लिए स्तनपान की सिफारिश की जाती है। मिशन इंद्रधनुष योजना पूर्ण प्रतिरक्षण कवरेज सुनिश्चित करती है। क्या आप नवजात शिशु देखभाल के बारे में विशिष्ट सलाह चाहते हैं?",
  
  child: "बच्चों को नियमित स्वास्थ्य जांच और सभी अनुशंसित टीकाकरण प्राप्त करने चाहिए। एकीकृत बाल विकास सेवाएं (ICDS) पोषण सहायता और स्वास्थ्य सेवाएं प्रदान करती हैं। क्या आपके बच्चे को विशिष्ट स्वास्थ्य मार्गदर्शन की आवश्यकता है?",
  
  adolescent: "किशोर स्वास्थ्य में शारीरिक, मानसिक और सामाजिक कल्याण शामिल है। राष्ट्रीय किशोर स्वास्थ्य कार्यक्रम (RKSK) किशोर स्वास्थ्य पर केंद्रित है। क्या आप किशोरों के लिए पोषण, मानसिक स्वास्थ्य या प्रजनन स्वास्थ्य के बारे में जानकारी चाहते हैं?",
  
  scheme: "भारत में कई सरकारी योजनाएं मातृ और शिशु स्वास्थ्य का समर्थन करती हैं, जिनमें जननी सुरक्षा योजना (JSY), प्रधानमंत्री मातृ वंदना योजना (PMMVY) और आयुष्मान भारत शामिल हैं। क्या आप किसी विशिष्ट योजना के बारे में विवरण जानना चाहते हैं?",
  
  hospital: "सही स्वास्थ्य प्रदाता को खोजना महत्वपूर्ण है। क्या आप चाहते हैं कि मैं आपके क्षेत्र में निकटतम अस्पतालों या आशा कार्यकर्ताओं को ढूंढने में आपकी मदद करूं?",
  
  diet: "मातृ और शिशु स्वास्थ्य के लिए उचित पोषण आवश्यक है। संतुलित आहार में प्रोटीन, कार्बोहाइड्रेट, स्वस्थ वसा, विटामिन और खनिज शामिल होने चाहिए। क्या आप विशिष्ट आहार संबंधी सिफारिशें चाहते हैं?",
  
  vaccination: "गंभीर बीमारियों को रोकने के लिए टीकाकरण महत्वपूर्ण है। सार्वभौमिक प्रतिरक्षण कार्यक्रम (UIP) बच्चों के लिए मुफ्त टीके प्रदान करता है। क्या आप टीकाकरण कार्यक्रम या विशिष्ट टीकों के बारे में जानना चाहते हैं?",
  
  default: "मैं प्रजनन, मातृ, नवजात, बाल और किशोर स्वास्थ्य प्रश्नों में मदद के लिए यहां हूं। मैं सरकारी स्वास्थ्य योजनाओं के बारे में भी जानकारी प्रदान कर सकता हूं। क्या आप कृपया बता सकते हैं कि आप क्या जानना चाहते हैं?"
};

// This is a mock function that simulates an AI response
// In a real app, this would make an API call to your backend
export const getAIResponse = async (message: string, language: string = 'en'): Promise<string> => {
  console.log('Sending message to AI:', message, 'Language:', language);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response logic based on keywords
  const messageLower = message.toLowerCase();
  
  // Use Hindi responses if language is Hindi
  if (language === 'hi') {
    if (messageLower.includes('गर्भावस्था') || messageLower.includes('गर्भवती')) {
      return hindiResponses.pregnancy;
    } else if (messageLower.includes('शिशु') || messageLower.includes('बच्चा') || messageLower.includes('नवजात')) {
      return hindiResponses.baby;
    } else if (messageLower.includes('बाल') || messageLower.includes('बच्चे')) {
      return hindiResponses.child;
    } else if (messageLower.includes('किशोर')) {
      return hindiResponses.adolescent;
    } else if (messageLower.includes('योजना') || messageLower.includes('सरकारी') || messageLower.includes('सहायता')) {
      return hindiResponses.scheme;
    } else if (messageLower.includes('अस्पताल') || messageLower.includes('डॉक्टर') || messageLower.includes('चिकित्सा')) {
      return hindiResponses.hospital;
    } else if (messageLower.includes('आहार') || messageLower.includes('पोषण') || messageLower.includes('खाना')) {
      return hindiResponses.diet;
    } else if (messageLower.includes('टीकाकरण') || messageLower.includes('टीका') || messageLower.includes('प्रतिरक्षण')) {
      return hindiResponses.vaccination;
    } else {
      return hindiResponses.default;
    }
  } else {
    // English responses
    if (messageLower.includes('pregnancy') || messageLower.includes('pregnant')) {
      return "Regular prenatal care is essential during pregnancy. The Janani Suraksha Yojana (JSY) provides financial assistance for hospital deliveries. Would you like to know more about pregnancy care or government schemes?";
    } else if (messageLower.includes('baby') || messageLower.includes('infant') || messageLower.includes('newborn')) {
      return "Newborns should receive their first vaccinations within 24 hours of birth. Breastfeeding is recommended for the first 6 months. The Mission Indradhanush scheme ensures full immunization coverage. Would you like specific advice about newborn care?";
    } else if (messageLower.includes('child') || messageLower.includes('toddler')) {
      return "Children should receive regular health check-ups and complete all recommended vaccinations. The Integrated Child Development Services (ICDS) provides nutritional support and health services. Does your child need specific health guidance?";
    } else if (messageLower.includes('adolescent') || messageLower.includes('teen')) {
      return "Adolescent health includes physical, mental, and social well-being. The Rashtriya Kishor Swasthya Karyakram (RKSK) focuses on adolescent health. Would you like information about nutrition, mental health, or reproductive health for adolescents?";
    } else if (messageLower.includes('scheme') || messageLower.includes('government') || messageLower.includes('assistance')) {
      return "Several government schemes support maternal and child health in India, including Janani Suraksha Yojana (JSY), Pradhan Mantri Matru Vandana Yojana (PMMVY), and Ayushman Bharat. Would you like details about a specific scheme?";
    } else if (messageLower.includes('hospital') || messageLower.includes('doctor') || messageLower.includes('medical')) {
      return "It's important to find the right healthcare provider. Would you like me to help you locate nearby hospitals or ASHA workers in your area?";
    } else if (messageLower.includes('diet') || messageLower.includes('nutrition') || messageLower.includes('food')) {
      return "Proper nutrition is essential for maternal and child health. A balanced diet should include proteins, carbohydrates, healthy fats, vitamins, and minerals. Would you like specific dietary recommendations?";
    } else if (messageLower.includes('vaccination') || messageLower.includes('vaccine') || messageLower.includes('immunization')) {
      return "Vaccinations are crucial for preventing serious diseases. The Universal Immunization Programme (UIP) provides free vaccines for children. Would you like to know about the vaccination schedule or specific vaccines?";
    } else {
      return "I'm here to help with reproductive, maternal, newborn, child, and adolescent health questions. I can also provide information about government health schemes. Could you please be more specific about what you'd like to know?";
    }
  }
};
